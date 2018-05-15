FROM microsoft/aspnetcore-build:2.0

# Setup Environment
RUN apt-get update && apt-get -y install netcat nodejs
RUN npm update -g npm@5.x
RUN npm install -g gulp-cli@2.x

# Copy Source Files
COPY website app/website
COPY server app/server

# Build Website
WORKDIR app/website
RUN npm install
RUN npm install gulp
RUN gulp production-build

# Build Server
WORKDIR /app/server/PlayGen.ResourceForceAuthoringTool.WebAPI/
RUN chmod +x delay-startup.sh
RUN dotnet publish -f netcoreapp2.0 -c Release -o out

ENTRYPOINT ./delay-startup.sh dotnet out/PlayGen.ResourceForceAuthoringTool.WebAPI.dll
