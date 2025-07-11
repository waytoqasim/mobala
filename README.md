Frontend:

Run these command in Visual Studio Terminal
npm i (First Command)
npm run build (Second Command)

When build complete, got to the build bolder select all files except the "build.zip" and make an compressed file with unique name.
Now open browser and go on webmin and login in it by using credentials and then go to File Manager.
Delete the Static & Recent zip folder on it (You have 2 folder like HM_Development 1 for backup and 1 for Publish so delete the old one).
Then upload the Compressed file from the build folder in this and Extract it.

Backend:
open .sln file
in solution explorer right click on project(MobalaFx) and click on publish
go to the published folder and make a zip for reccently modified files
publish on virtualmin
restart the MobalaApi.service by command systemctl restart MobalaApi.service   