
# news-search

This project provides an interface to search news by keywords using NewsAPI. 
## Deployment

### Installing dependencies
Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/yourusername/news-search-engine
cd news-search-engine
```

Create a virtual environment and activate it

```bash
  python3 -m venv venv  # Activate venv
  source venv/bin/activate
```

Install python dependencies
```bash
pip install -r requirements.txt
```

Running the app. (Add API key first!)
```bash
flask run
```
## Environment Variables

To run this project, you will need to add the following environment variables to the .env file

Get your API key at https://newsapi.org/ and add it to .env

`NEXTAPI_KEY`



## Tech Stack

**Frontend** - React, Redux, Material UI

**Backend** - Python, Flask

**News API** - API used for retrieving news articles



## Authors

- [@vinayb1012](https://www.github.com/vinayb1012)

