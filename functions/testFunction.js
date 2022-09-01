exports.handler = async () => {
    console.log('serverless function ran');

    const data = {
        name: 'Super Mario',
        age: 45,
        job: 'Plumber'
    };

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}