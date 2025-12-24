# Agent Skills (TypeScript/Node.js)

Agent Skills for GitHub Copilot - A collection of reusable skills that work across VS Code, GitHub Copilot CLI, and Copilot coding agent.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Jira Credentials

Create a `.env` file in your project root:

```env
JIRA_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token
JIRA_DEFAULT_PROJECT=SAM1
```

Get your API token from: https://id.atlassian.com/manage-profile/security/api-tokens

### 3. Test Connection

```bash
npm run test-connection
```

## 📦 Available Skills

### create-ticket
Creates Jira tickets with proper formatting, branches, and PRs.

```bash
npm run create-ticket -- --summary "Add user login" --type Story
```

### work-on-ticket
Fetches ticket details and sets up development workflow.

```bash
npm run work-on-ticket -- --ticket SAM1-123
```

### code-review
Code review guidelines and checklists (instruction-only, no scripts).

### api-integration
API integration patterns and best practices.

### data-analysis
Data analysis workflows and patterns.

## 🔧 Usage as Git Submodule

Add to your project:

```bash
git submodule add https://github.com/IHKREDDY/agent-skills-ts.git .github/skills
```

## 📖 Learn More

- [Agent Skills Specification](https://agentskills.io/)
- [VS Code Agent Skills Documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
