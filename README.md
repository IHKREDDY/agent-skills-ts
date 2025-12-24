# Agent Skills (TypeScript/Node.js)

Agent Skills for GitHub Copilot - A collection of reusable skills that work across VS Code, GitHub Copilot CLI, and Copilot coding agent.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd .github/skills
npm install
```

### 2. Configure Jira Credentials

**Option A: Interactive Setup (Recommended)**
```bash
npm run setup
```

**Option B: Manual Setup**
```bash
cp .env.example .env
# Edit .env with your credentials
```

Your `.env` file should contain:
```env
JIRA_URL=https://ihkreddy.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token
JIRA_DEFAULT_PROJECT=SAM1
```

> 🔑 **Get your API token:** https://id.atlassian.com/manage-profile/security/api-tokens

> 🔒 **Security:** The `.env` file is gitignored and will never be committed.

### 3. Test Connection

```bash
npm run test-connection
```

## 📦 Available Skills

| Skill | Description | Has Scripts |
|-------|-------------|-------------|
| **create-ticket** | Create Jira tickets with branches/PRs | ✅ |
| **work-on-ticket** | Fetch ticket details, start development | ✅ |
| **code-review** | Code review guidelines and checklists | ❌ |
| **api-integration** | API integration patterns | ❌ |
| **data-analysis** | Data analysis workflows | ❌ |

### create-ticket

```bash
# Simple ticket
npm run create-ticket -- -s "Add user login" -t Story

# With branch and PR
npm run create-ticket -- -s "Fix bug" -t Bug --create-branch --create-pr

# Full options
npm run create-ticket -- \
  -s "Implement search" \
  -t Story \
  -d "Detailed description" \
  --priority High \
  --labels "backend,api" \
  -ac "Search returns results in < 2s" \
  --create-branch
```

### work-on-ticket

```bash
# Start work on existing ticket
npm run work-on-ticket -- --ticket SAM1-123

# Just fetch details
npm run fetch-ticket -- --ticket SAM1-123
```

## 🔧 Configuration Options

### Priority Order
1. **Environment variables** - `JIRA_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`
2. **`.env` file** - In project root (recommended)
3. **VS Code settings** - URL and email only (token must be in .env)

### VS Code Workspace Settings (Optional)
Add to `.vscode/settings.json` for shared team config:
```json
{
  "agentSkills.jira": {
    "url": "https://ihkreddy.atlassian.net",
    "defaultProject": "SAM1"
  }
}
```
> ⚠️ Never put your API token in settings.json - it should only be in `.env`

## 🔗 Usage as Git Submodule

Add to your project:
```bash
git submodule add https://github.com/IHKREDDY/agent-skills-ts.git .github/skills
cd .github/skills && npm install
npm run setup
```

## 📖 Learn More

- [Agent Skills Specification](https://agentskills.io/)
- [VS Code Agent Skills Documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
