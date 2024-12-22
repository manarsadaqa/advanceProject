const express = require("express");
const app = express();

require("dotenv").config({ path: "./env/.env" });
app.use(express.json());
const loginAuthenticator = require("./routes/authenticationRoutes.js");

const userRouter = require("./routes/userRoute.js");
app.use("/users", userRouter);
 app.use("/autho", loginAuthenticator);
 
 const garden = require(`./routes/projectRoute.js`);
 
const publishedProjectsRouter = require(`./routes/publishedProjects/publishedProjectsRouter.js`);
app.get("/", publishedProjectsRouter);
const newsNowRouterExternalAPI = require(`./APIS/newsNow/newsNowRouter.js`);
 const weatherRouterExternalAPI = require(`./APIS/weather/weatherRouter.js`);
 const chatAIRouterExternalAPI = require(`./APIS/chatGPT/chatGPTRouter.js`);
app.use("/autho", loginAuthenticator);
app.use(`/garden`, garden);
app.use("/news", newsNowRouterExternalAPI);
app.use("/weather", weatherRouterExternalAPI);
app.use("/ChatAI", chatAIRouterExternalAPI);
 
const userResourcesRouter = require("./routes/resources/user.router");
const userknowledgeRouter = require("./routes/knowledge/user.router");
 const bodyParser = require("body-parser");
  const cropRoutes = require("./routes/cropRoutes");
const volunteer = require(`./routes/volunteerRoute.js`);

const partner = require(`./routes/partnerRoute.js`);

app.use(`/partner`, partner);

app.use("/users/resources", userResourcesRouter);
app.use("/users/knowledge", userknowledgeRouter);
 app.use(bodyParser.json());
  app.use("/api/crops", cropRoutes);
app.use(`/volunteer`, volunteer);
 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});