// TEMPORARY - delete after testing
import { analyzeIncident } from './llmService';

async function testService() {
    console.log('🧪 Testing DeepSeek-R1...');

    try {
        const result = await analyzeIncident(
            'Ex-partner arrived 3 hours late for exchange, yelled in front of child.',
            'Ontario'
        );

        console.log('✅ SUCCESS:', {
            summary: `${result.summary.substring(0, 100)}...`,
            severity: result.severity,
            actionCount: result.actionItems.length,
            hasCitations: !!result.citations?.length,
        });
    } catch (error) {
        console.error('❌ FAILED:', error);
    }
}

// Run in browser console after npm run dev
testService();
