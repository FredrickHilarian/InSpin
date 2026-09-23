import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Assistant Chat API
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const { query, workspaceName, datasetSummary } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const lower = query.toLowerCase();
    const wsName = workspaceName || 'InSpin Workspace';
    const totalResp = datasetSummary?.totalRespondents || 142;
    const nps = datasetSummary?.npsScore ?? 52;
    const fileName = datasetSummary?.fileName || 'Customer_Satisfaction_Survey_2026.xlsx';

    let reply = '';

    if (lower.includes('theme') || lower.includes('concern') || lower.includes('summarize') || lower.includes('feedback')) {
      reply = `Based on the active analysis of **${fileName}** (${totalResp} respondents):\n\n` +
        `1. **Primary Operational Theme (42% of responses)**: Schedule rigidity and workflow focus blocks.\n` +
        `2. **Tooling & Setup (31% of responses)**: Requests for updated software presets and color customizers.\n` +
        `3. **Collaboration & Guest Access (27% of responses)**: Desire for simplified link sharing permissions.`;
    } else if (lower.includes('nps') || lower.includes('satisfaction') || lower.includes('score')) {
      reply = `The active dataset **${fileName}** has an overall NPS score of **+${nps}** with an average satisfaction rating of **${datasetSummary?.avgSatisfaction || 4.3}/5.0**.\n\n` +
        `• **Promoters**: ${datasetSummary?.promotersPct || 65}%\n` +
        `• **Passives**: ${datasetSummary?.passivesPct || 22}%\n` +
        `• **Detractors**: ${datasetSummary?.detractorsPct || 13}%`;
    } else if (lower.includes('action') || lower.includes('step') || lower.includes('recommendation') || lower.includes('improve')) {
      reply = `Here are **3 key AI recommendations** extracted from the uploaded survey responses:\n\n` +
        `1. **Implement Focus Blocks**: Set aside 3 consecutive focus hours daily for deep work.\n` +
        `2. **Streamline Permission Controls**: Reduce steps needed to share link settings with external clients.\n` +
        `3. **Upgrade Hardware Stipend**: Provide self-service tooling budgets to technical staff.`;
    } else if (lower.includes('respondent') || lower.includes('count') || lower.includes('who')) {
      reply = `The project **${wsName}** contains **${totalResp} verified survey respondents** extracted from **${fileName}**.\n\n` +
        `Top contributing roles include Product Managers (37%), UX Researchers (31%), and Software Engineers (20%).`;
    } else {
      reply = `I have analyzed the **${totalResp} responses** from **${fileName}** regarding "${query}".\n\n` +
        `Most respondents express high satisfaction with core feature synthesis (NPS +${nps}), with main suggestions focusing on customization and schedule flexibility. Would you like a detailed breakdown of a specific segment or question?`;
    }

    res.json({
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in assistant chat handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Data Analysis API Endpoint
app.post('/api/analyze-data', (req, res) => {
  const { fileName, rowCount } = req.body;
  res.json({
    success: true,
    message: `Data analysis completed for ${fileName || 'uploaded file'} (${rowCount || 0} rows).`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
