<p style="text-align: center;" align="center">
 <img src="https://images.unsplash.com/photo-1652107788664-02b06074ac28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" style="width: 100%;" height="500" alt="CRM"/>
</p>

# Overview of My Submission

## STACKER

Is a software that helps businesses to easily track communications between customer service agents and clients.It uses ``REDIS`` to store data(issues submitted by clients). It is integrated with a chat developed using ``socketIO``. This Project comes with a`` python(Flask) API `` and a ``Vue,Vite Application``.The user interface was built using ``tailwindCss``.

### Basic Functionality:

1. As a client, you create an account or register.
2. Access the dashboard
3. Create an Issue(the issue will be added to a queue)
4. On the customer service agent side.
5. Login to the system.
6. You will see a dashboard with a list of Issues to be attended.
7. Those that are already being attended by other agents, will be indicated in red.
8. Attend an issue with a green background.
9. To attend an issue, click go to chat. It will redirect you to a chat where you can communicate with a client.
10. The client will be notified when the issue is being attended.
11. If an issue has been completed, it is CLOSED.
12. If it is under investigation, it is ARCHIVED.
13. Otherwise, it is left OPEN / in PROGRESS.
14. On the dashboard, the client and the customer service agent will be able to see their issues -open,closed and archived.


### Why this?:

We want to provide a simple way  for customer representative agents to handle multiple clients at the same time seemlessly, using a chat and a queuing system.


### Where we used redis.
#### ((as a primary database using RedisJson Module through Redis OM Python))

-  Storage of chat information - messages
-  Storage of Issues
-  Storage of user data

# Submission Category:

Wacky Wildcards

# Overview video (Optional)

Here's a short video that explains the project and how it uses Redis:

[Insert your own video here, and remove the one below]

[![Embed your YouTube video](https://i.ytimg.com/vi/vyxdC1qK4NE/maxresdefault.jpg)](https://www.youtube.com/watch?v=vyxdC1qK4NE)

# Link to Code

[https://github.com/emacliam/REDIS-HACKERTHON---CRM]

# Languages Used:

``Javascript(Vue,js)``  ``html``  ``Tailwindcss``   ``Python``

# Screen screenshots
[Insert app screenshots](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#uploading-assets)


## How it works

### How the data is stored:
Data is stored using RedisJSON module in DB and RedisOM Python as a client library
    - Store (Add):
        - `` model_instance = ModelName(key1=value1, key2=value2, ..., keyN=valueN) ``
        - `` model_instance.save() ``

## Code Example:Database Schema

### Issues
```python
class Issue(EmbeddedJsonModel, JsonModel):
    subject: Optional[Optional[str]] = Field(index=True)
    description: Optional[str] = Field(index=True)
    issue_status: Optional[str] = Field(index=True)
    sender: Optional[str] = Field(index=True)
    created_at: Optional[str] = Field(index=True)
    record_status: Optional[str] = Field(index=True)
```

### Messages
```python
class Message(JsonModel):
    issue: Optional[Optional[str]] = Field(index=True)
    sender: Optional[str] = Field(index=True)
    sender_data: User
    issue_data: Issue
    message_body: Optional[str] = Field(index=True)
```
### User
```python
class User(EmbeddedJsonModel, JsonModel):
    first_name: Optional[str] = Field(index=True)
    last_name: Optional[str] = Field(index=True)
    role: Optional[str] = Field(index=True)
    created_at: Optional[str] = Field(index=True)
    record_status: Optional[str] = Field(index=True)
```

### How the data is accessed:
-Get:
        - `` model_instance = ModelName.find((ModelName.field1=="value1")&(ModelName.field2=="value2")) `` - to filterby field1's and field2's values.

## Code Example: How to access/get user data
```python
def get_users():
    try:
        users = User.find(User.record_status=="ALIVE").all()
        users_list = []

        for user in users:
            user_dict = {}

            for x in user:
                user_dict[x[0]] = x[1]

            users_list.append(user_dict)

        return jsonify({
            "status_code": "200",
            "status": "success",
            "message": "users_retrieved_ok",
            "data": users_list
        })

    except:
        traceback.print_exc()
        return jsonify({
            "status_code": "500",
            "status": "error",
            "message": "failed_to_retrieve_users",
            "data": [],
        })

```



### Performance Benchmarks

[If you migrated an existing app to use Redis, please put performance benchmarks here to show the performance improvements.]



## How to run it locally?

### Backend
* Prerequisites:
``Python 3.8.2``
* Local Installation Steps:

```
- clone repo
- access folder titled "CRM BACKEND"
- add ".env" file in the root directory of the project and add the line:
        -> REDIS_OM_URL=[URL_TO_REDIS_CLOUD]
- create and activate virtual environment in the root directory using the command (on Windows 10 cmd):
        -> python -m venv [ENVIRONMENT_NAME]
        -> ENVIRONMENT_NAME\scripts\activate
-install project packages in the active environment using the command (on Windows 10 cmd):
        -> pip install -r requirements.txt
    -run flask API using the command (on Windows 10 cmd):
        -> flask run
    -it should give an output like:
        * Debug mode: on
        * Running on localhost:[PORT_NUMBER]
        * Restarting with stat
        * Debugger is active!
        * Debugger PIN: [DEBUGGER_PIN]
```

### Frontend
* Prerequisites:
``Node.js > 14``
* Local Installation Steps:

```
- clone repo
- access folder titled "CRM FRONTEND"
- run "YARN INSTALL"
- In the project folder, there is a file "config.js".change url to the backends server url.
- run "YARN DEV" to run the project
```


[Make sure you test this with a fresh clone of your repo, these instructions will be used to judge your app.]

### Prerequisites

[Fill out with any prerequisites (e.g. Node, Docker, etc.). Specify minimum versions]

### Local installation

[Insert instructions for local installation]

## Deployment

To make deploys work, you need to create free account on [Redis Cloud](https://redis.info/try-free-dev-to)

### Google Cloud Run

[Insert Run on Google button](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-button-click-to-deploy-your-git-repos-to-google-cloud)

### Heroku

[Insert Deploy on Heroku button](https://devcenter.heroku.com/articles/heroku-button)

### Netlify

[Insert Deploy on Netlify button](https://www.netlify.com/blog/2016/11/29/introducing-the-deploy-to-netlify-button/)

### Vercel

[Insert Deploy on Vercel button](https://vercel.com/docs/deploy-button)

## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
