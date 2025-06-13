# reflection

Analyze and improve the Claude Code instructions and configuration for this project.

## Command

You are an expert in prompt engineering, specializing in optimizing AI code assistant instructions. Your task is to analyze and improve the documentation and configuration for Claude Code. Follow these steps carefully:

1. **Comprehensive Analysis Phase**
   
   Review the chat history in your context window, then examine ALL relevant documentation and configuration:
   
   <claude_instructions>
   /CLAUDE.md
   /CLAUDE.md
   /.claude/commands/
   .claude/settings.json
   .claude/settings.local.json
   </claude_instructions>
   
   Analyze these sources to identify:
   - Inconsistencies in Claude's responses
   - Misunderstandings of user requests
   - Missing HOW-TO documentation for team workflows
   - Absent WHY explanations for architectural decisions
   - Opportunities to enhance Claude's ability to handle specific queries
   - New commands or improvements to existing command names/functions
   - MCP tools and permissions that should be added to configuration
   - Deviations from best practices that aren't documented

2. **Modular Documentation Assessment**
   
   Check if documentation follows the recommended structure:
   ```
   CLAUDE.md                    # Project-wide context
   .claude/
   ├── commands/
   │   ├── pr.md               # How to create PRs
   │   ├── issue.md            # Issue workflow
   │   ├── review.md           # Code review process
   │   └── [workflow].md       # Other team workflows
   ├── settings.json           # Tool configurations
   └── settings.local.json     # Local overrides
   
   src/
   ├── [module]/
   │   └── CLAUDE.md          # Module-specific patterns
   ```
   
   Suggest restructuring if needed.

3. **MCP Integration Check**
   
   Review available Model Context Protocol tools:
   - Identify tools used in chat but not configured
   - Suggest new MCP integrations that would help
   - Check for tools like:
     - Issue tracker integration (Jira, GitHub Issues)
     - CI/CD pipeline access
     - Documentation systems (Context7)
     - Monitoring/metrics tools
     - Screenshot/UI testing tools
     - Filesystem operations

4. **Documentation Quality Analysis**
   
   For each piece of documentation, verify it follows these principles:
   - Documents HOW to accomplish tasks (not WHAT code does)
   - Explains WHY decisions were made
   - Only documents deviations from best practices
   - Includes specific examples of good/bad patterns
   - Avoids obvious information to reduce token usage

5. **Interaction Phase**
   
   Present findings and improvements. For each suggestion:
   a) Explain the current issue identified
   b) Propose specific changes or additions
   c) Describe how this improves Claude's performance
   d) Estimate token/time savings if applicable
   
   Wait for feedback before proceeding to implementation.

6. **Implementation Phase**
   
   For approved changes:
   a) State which file/section is being modified
   b) Present the new or modified content
   c) Explain how this addresses the identified issue
   d) Note any dependencies or related changes needed

7. **Version Control Considerations**
   
   Suggest:
   - Which changes should be reviewed by senior team members
   - How to test the documentation changes
   - Frequency of future reflection cycles
   - Automation opportunities

<analysis>
[List all identified issues and improvement opportunities]
</analysis>

<improvements>
[For each approved improvement:
1. File/section being modified
2. New or modified content
3. Explanation of impact
4. Dependencies or related changes]
</improvements>

<mcp_configurations>
[List any MCP tools or permissions to add]
</mcp_configurations>

<final_instructions>
[Complete, updated documentation incorporating all changes]
</final_instructions>

Remember: Good documentation multiplies team velocity. Every token saved in prompting is money, time, and energy saved. Focus on high-leverage improvements that will benefit every AI interaction.