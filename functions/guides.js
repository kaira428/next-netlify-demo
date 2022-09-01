exports.handler = async (event, context) => {
  const guides = [
    { title: "Best #1", author: "mario" },
    { title: "Best #2", author: "luigi" },
    { title: "Best #3", author: "chun-li" },
  ];

  console.log("clientContext: ");
  console.log(context.clientContext);

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({message:  'Oh O! You must be logged in to view the details.'}),
  };
};
