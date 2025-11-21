import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3006'; // Asegúrate de que este puerto coincida con tu servidor

async function testFlow() {
    console.log('1. Starting test session...');
    const startRes = await fetch(`${BASE_URL}/api/test/start`, { method: 'POST' });
    const startData = await startRes.json();

    if (!startData.success) {
        console.error('Start failed:', startData);
        return;
    }

    const sessionId = startData.sessionId;
    console.log('Session ID:', sessionId);

    console.log('2. Fetching questions...');
    const questionsRes = await fetch(`${BASE_URL}/api/test/questions`);
    const questionsData = await questionsRes.json();

    if (!questionsData.success) {
        console.error('Fetch questions failed:', questionsData);
        return;
    }

    const questions = questionsData.questions;
    console.log(`Fetched ${questions.length} questions`);

    console.log('3. Simulating answers...');
    const answers = questions.map(q => ({
        questionId: q.id,
        selectedOption: 0, // Siempre elige la primera opción
        timeTakenMs: 1000
    }));

    console.log('4. Submitting answers...');
    const submitRes = await fetch(`${BASE_URL}/api/test/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sessionId,
            answers
        })
    });

    const submitData = await submitRes.json();
    console.log('Submit Response:', JSON.stringify(submitData, null, 2));
}

testFlow();
