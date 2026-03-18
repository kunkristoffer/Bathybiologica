# Bathybiologica - A marine bioligy foundation

Welcome to the repository for our website and community pages. In this document you can find information on how you can run, modify and contribute to this project.

This project was started in 2025 to facilitate and organize an online presence for our non-profit foundation, the plan is to have a website we can use to spread awareness and our reach. While the current page works as a static site which covers basic neccesseties, we have plans to expand it with CMS-driven articles and blog content, secure user authentication, and a community platform where members can communicate, collaborate, and organize events.

## Getting Started locally

If is possible to run this project locally for development purposes, this section will guide you through the process

### Required software

> [!NOTE]  
> The programs listed in this sections are just suggestions, if you have prefered software that handles Javascript based applications you can use those.

You'll need the following pieces of software for running or modifying this application

- [NodeJS](https://nodejs.org/en) - A javascript runtime which allows your computer to understand the code and run it
- [VScode](https://code.visualstudio.com/) - An IDE which gives you a better program to modify the code in
- [GIT](https://git-scm.com/) (Optional) - For interacting with this repository programatically

### Acquiring and running project

You have two options when it comes to getting a local copy of this codebase, you can eiter clone with GIT ([tutorial](https://code.visualstudio.com/docs/sourcecontrol/quickstart)) or manually [download](https://github.com/kunkristoffer/Bathybiologica/archive/refs/heads/main.zip) it

If you want to clone with GIT, open your terminal from the folder you want to save it in and run

```console
git clone https://github.com/kunkristoffer/Bathybiologica
```

After you have a local copy of the files you can now install all required libraries through Node package manager command

```console
npm install
```

> [!WARNING]  
> Before we start the server you need to create the `.env.local` file in the root directory, you can base it off [.env.template](./.env.template). You can then contact a maintainer for development keys.

You can now run the project locally with the following command

```console
npm run dev
```

You should now see some status messages and a localhost link you can click on to open the server in your browser.

## Troubleshooting

### Execution policy on windows

If you're running into this warning when trying to run the console commands

```diff
- npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
- For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
- At line:1 char:1
- npm run dev
- ~~~
- CategoryInfo : SecurityError: (:) [], PSSecurityException + FullyQualifiedErrorId : UnauthorizedAccess
```

You need to allow the execution script from node to start by setting up an execution policy, you can read more [here](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy) or as a tl;dr you can run this command from the projects root directory

```console
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Command not found

If you get this error when trying to start the project, check that you're in the projects root directory and that you have installed all dependencies.

```diff
- my-app@0.1.0 dev
- next dev --turbopack

- sh: line 1: next: command not found
```

You can try to re-install dependencies

```console
npm install
```

## Helpfull resources

- [NextJS](https://nextjs.org/docs) - This documentation explains how our Next server works
- [React](https://react.dev/learn) - This documentation exlains how React works to create our UI
- [Supabase](https://supabase.com/docs) - This documentation explains how our database and javascript client library works
- [W3School](https://www.w3schools.com/js/default.asp) - Introduction to the Javascript language
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Javascript resource and documentation
- [Typescriptlang](https://www.typescriptlang.org/docs/handbook/intro.html) - Typescript documentation

## Contributing to this project

If you want to contribute to this project you're more than welcome to, but please create issues first as all pull request must have an linked issue for tracking. You can create a fork of this repository while working on your own branch and submit an upstream pull request when it's ready. All contributers will be credited for their work.
