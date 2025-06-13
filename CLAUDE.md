# Claude Code Context for LOCOMOTIVE Projects

This is the root context for all projects in Marty Martin's development environment. Individual projects may have their own CLAUDE.md files that extend or override these settings.

## About Me
- **Name**: Marty Martin
- **Role**: Founder & CEO of LOCOMOTIVE Agency
- **Location**: Chapel Hill, NC, USA
- **Company**: LOCOMOTIVE Agency (operations in North America and Europe)
- **Website**: https://locomotive.agency/

## My Working Style
- **Strengths**: Visionary thinking, Business management, Learning, Problem-solving
- **Challenges**: Attention span (ADD), Keeping things on schedule, Business planning, Internal communications
- **What I need from AI**: Fill in for my weaknesses, act as an expert internal consultant, expert programmer and product designer

## General Development Preferences

### Code Style
- Clear, readable code with descriptive variable names
- Comprehensive comments for complex logic
- Modular, reusable components
- Test-driven development when possible

### Documentation
- Document the WHY, not the WHAT
- Focus on workflows and processes (HOW to get things done)
- Keep documentation close to the code it describes
- Use examples to illustrate patterns

### Communication
- Be direct and actionable
- Provide multiple options when solving problems
- Explain trade-offs clearly
- Flag potential issues proactively

## Available MCP Tools
When working on projects, check for available MCP tools by examining `.claude/settings.local.json`. Common tools include:
- GitHub integration
- Slack integration
- Reddit tools
- Context7 for documentation
- Playwright for browser automation
- Morphik for knowledge management
- Taskmaster for project management
- Filesystem operations

## Project Structure Preferences
```
project/
├── CLAUDE.md           # Project-specific context
├── .claude/
│   ├── commands/       # Custom commands
│   └── settings.local.json
├── src/                # Source code
├── tests/              # Test files
├── docs/               # Human documentation
└── README.md           # Public documentation
```

## Important Notes
- Always check for project-specific CLAUDE.md files that may override these defaults
- Use the `/reflection` command periodically to improve documentation
- When in doubt, ask for clarification rather than making assumptions

---

*Last updated: December 2024*