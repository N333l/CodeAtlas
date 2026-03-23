from setuptools import setup, find_packages

setup(
    name="codeatlas",
    version="0.1.0",
    description="Automated Codebase Architecture Analyzer",
    author="CodeAtlas Team",
    packages=find_packages(),
    python_requires=">=3.8",
    install_requires=[
        "Flask>=2.3.3",
        "Flask-CORS>=4.0.0",
        "GitPython>=3.1.32",
        "requests>=2.31.0",
        "networkx>=3.1",
        "PyYAML>=6.0",
        "python-dotenv>=1.0.0",
    ],
)
