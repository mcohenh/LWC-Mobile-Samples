exports.run = function () {
  const childProcess = require("child_process");
  const path = require("path");

  const expectedProjectPath = path.resolve(
    __dirname,
    "../apps/android/LwcTestApp"
  );

  const expectedCompiledAppPath = path.resolve(
    __dirname,
    "../apps/android/LwcTestApp/app/build/outputs/apk/debug/app-debug.apk"
  );

  const androidHome = process.platform === "win32" ? "%ANDROID_HOME%" : "$ANDROID_HOME";
  const sdkmanager = path.join(androidHome, "tools", "bin", "sdkmanager");
  const acceptLicensesCommand = process.platform === "win32"
    ? `echo y| ${sdkmanager} \"build-tools;29.0.2\"`
    : `yes | ${sdkmanager} \"build-tools;29.0.2\"`;
  childProcess.execSync(acceptLicensesCommand, { stdio: ["ignore", "pipe", "pipe"] });

  const compileCommand =
    process.platform === "win32" ? "gradlew.bat build" : "./gradlew build";

  childProcess
    .execSync(`pushd ${expectedProjectPath} && ${compileCommand} && popd`, {
      stdio: ["ignore", "pipe", "pipe"]
    });

  return expectedCompiledAppPath;
};