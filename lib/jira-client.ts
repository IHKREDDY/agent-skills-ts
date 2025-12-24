/**
 * Jira API Client
 * TypeScript/Node.js implementation for Jira REST API
 */

import { JiraConfig } from './jira-config.js';

export interface JiraTicket {
  key: string;
  id: string;
  url: string;
  self: string;
}

export interface JiraIssue {
  key: string;
  id: string;
  fields: {
    summary: string;
    description: any;
    status: { name: string };
    priority?: { name: string };
    issuetype: { name: string };
    assignee?: { displayName: string; emailAddress: string };
    reporter?: { displayName: string };
    labels: string[];
    created: string;
    updated: string;
  };
}

export interface CreateTicketOptions {
  project: string;
  summary: string;
  description?: string;
  issueType?: string;
  priority?: string;
  labels?: string[];
  acceptanceCriteria?: string[];
  assignee?: string;
}

export class JiraClient {
  private config: JiraConfig;
  private authHeader: string;

  constructor(config: JiraConfig) {
    this.config = config;
    this.authHeader = 'Basic ' + Buffer.from(`${config.email}:${config.token}`).toString('base64');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.url}/rest/api/3${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': this.authHeader,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Jira API error ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.request('/myself');
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser(): Promise<{ displayName: string; emailAddress: string }> {
    return this.request('/myself');
  }

  async getIssue(ticketId: string): Promise<JiraIssue> {
    return this.request(`/issue/${ticketId}`);
  }

  async createTicket(options: CreateTicketOptions): Promise<JiraTicket> {
    // Build description content in Atlassian Document Format
    const descriptionContent: any[] = [];

    if (options.description) {
      descriptionContent.push({
        type: 'paragraph',
        content: [{ type: 'text', text: options.description }]
      });
    }

    // Add acceptance criteria if provided
    if (options.acceptanceCriteria && options.acceptanceCriteria.length > 0) {
      descriptionContent.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Acceptance Criteria' }]
      });

      descriptionContent.push({
        type: 'bulletList',
        content: options.acceptanceCriteria.map(criteria => ({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: criteria }]
          }]
        }))
      });
    }

    const payload: any = {
      fields: {
        project: { key: options.project },
        summary: options.summary,
        issuetype: { name: options.issueType || 'Task' }
      }
    };

    if (descriptionContent.length > 0) {
      payload.fields.description = {
        type: 'doc',
        version: 1,
        content: descriptionContent
      };
    }

    if (options.priority) {
      payload.fields.priority = { name: options.priority };
    }

    if (options.labels && options.labels.length > 0) {
      payload.fields.labels = options.labels;
    }

    if (options.assignee) {
      payload.fields.assignee = { accountId: options.assignee };
    }

    const response = await this.request<{ key: string; id: string; self: string }>('/issue', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      key: response.key,
      id: response.id,
      url: `${this.config.url}/browse/${response.key}`,
      self: response.self,
    };
  }

  async transitionIssue(ticketId: string, transitionName: string): Promise<void> {
    // Get available transitions
    const transitions = await this.request<{ transitions: Array<{ id: string; name: string }> }>(
      `/issue/${ticketId}/transitions`
    );

    const transition = transitions.transitions.find(
      t => t.name.toLowerCase() === transitionName.toLowerCase()
    );

    if (!transition) {
      throw new Error(`Transition '${transitionName}' not found. Available: ${transitions.transitions.map(t => t.name).join(', ')}`);
    }

    await this.request(`/issue/${ticketId}/transitions`, {
      method: 'POST',
      body: JSON.stringify({ transition: { id: transition.id } }),
    });
  }

  async addComment(ticketId: string, comment: string): Promise<void> {
    await this.request(`/issue/${ticketId}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        body: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: comment }]
          }]
        }
      }),
    });
  }
}
