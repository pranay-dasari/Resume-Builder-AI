import { testAIConnection } from './aiClient';

/**
 * Test function to verify AI service is working
 * Run this in development to ensure the API is accessible
 */
export const testAIProviders = async () => {
  console.log('🧪 Testing AI Service...');
  
  try {
    // Test API health
    const healthResponse = await fetch('/api/health');
    const healthData = await healthResponse.json();
    console.log('📡 API Health:', healthData);
    
    // Test AI connection
    const connectionTest = await testAIConnection();
    if (connectionTest) {
      console.log('✅ AI service is working properly');
    } else {
      console.log('❌ AI service test failed');
    }
  } catch (error) {
    console.error('❌ API test failed:', error);
  }

  console.log('🏁 AI service testing complete');
};

// Export for use in development console
if (typeof window !== 'undefined') {
  (window as any).testAIProviders = testAIProviders;
}