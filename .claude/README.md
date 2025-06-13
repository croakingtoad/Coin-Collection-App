# Claude Code Configuration

This directory contains configuration and commands for Claude Code to better assist with development tasks.

## Structure

```
.claude/
├── commands/           # Custom commands accessible via /command_name
│   ├── reflection.md   # Self-improvement system for documentation
│   ├── pr.md          # Pull request creation helper
│   ├── focus.md       # ADD-friendly focus management
│   └── summary.md     # Internal communication helper
├── settings.local.json # Local MCP configurations
└── README.md          # This file
```

## Available Commands

- `/reflection` - Analyzes and suggests improvements to Claude documentation
- `/pr` - Helps create well-structured pull requests
- `/focus` - Maintains focus and breaks down tasks (ADD-friendly)
- `/summary` - Creates clear summaries for internal communications

## Usage

In Claude Code, simply type `/` followed by the command name. For example:
- `/reflection` to improve documentation
- `/focus` when feeling overwhelmed or distracted

## Adding New Commands

1. Create a new `.md` file in the `commands/` directory
2. Follow the format: `# command_name` followed by description and `## Command` section
3. The command will be available immediately via `/command_name`

## Best Practices

- Run `/reflection` periodically to keep documentation fresh
- Document HOW and WHY, not WHAT
- Keep commands focused on specific workflows
- Version control all changes

Last updated: December 2024