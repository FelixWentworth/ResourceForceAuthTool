FROM microsoft/dotnet

RUN apt-get -qq update && apt-get -y install netcat nodejs npm

COPY . app/
WORKDIR app/

RUN ["dotnet", "restore"]

WORKDIR server/PlayGen.StoryGameMaker.WebAPI/wwwroot/
RUN ["npm", "install"]

WORKDIR /app/server/PlayGen.StoryGameMaker.WebAPI/
RUN ["dotnet", "publish", "-c", "Release", "-o", "out"]
RUN ["chmod", "+x", "delay-startup.sh"]

ENTRYPOINT ["./delay-startup.sh", "dotnet", "out/PlayGen.StoryGameMaker.WebAPI.dll"]
