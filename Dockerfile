FROM microsoft/aspnetcore-build:lts

COPY . app/
WORKDIR app/

RUN apt-get update && apt-get -y install netcat nodejs npm

# NPM
RUN npm update -g npm@3.x
RUN npm install -g gulpjs/gulp#4.0

WORKDIR /app/website/
RUN npm install
RUN gulp

WORKDIR /app/server/
RUN dotnet restore

WORKDIR PlayGen.ResourceForceAuthoringTool.WebAPI/
RUN chmod +x delay-startup.sh
RUN dotnet publish -c Release -o out

ENTRYPOINT dotnet out/PlayGen.ResourceForceAuthoringTool.WebAPI.dll