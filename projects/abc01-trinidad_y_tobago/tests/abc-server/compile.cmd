@echo off

title ABC Server

rem set tldrive=%~d0
rem set JAVA_HOME="%tldrive%\Program Files\Java\jre1.8.0_291"
rem set JAVA=%JAVA_HOME%\bin\java.exe
rem set ANT_HOME="%tldrive%\Software\apache-ant-1.10.10"
rem set ANT=%ANT_HOME%\bin\ant.bat

set JAVA=java
set ANT=ant
set MVN=mvn

set REPO=.\..\..\..\..\repos\server
set LIBS=%REPO%\libs
set DIST=%REPO%\target
set CONFIG=.\resources\config
set JAVA_OPTS=-server -Xms128m -Xmx512m -Xss1024k -XX:+UseAdaptiveSizePolicy -XX:+UseParallelGC -XX:+UseParallelOldGC -XX:ParallelGCThreads=2 -Djava.awt.headless=true -Djava.net.preferIPv4Stack=true
set JAVA_DEBUG_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005              

echo "Compiling..."
rem call %ANT% -buildfile %REPO% create-jar
call %MVN% clean package -Dmaven.test.skip=true -f %REPO%

rem @echo on

dir %DIST% *.jar /b /a-d > lastjarfile.temp
set /p JARFILE=<lastjarfile.temp
del lastjarfile.temp
set APP=%DIST%\%JARFILE%

echo "Compiled: %APP%!"

%JAVA% -Dconfig=%CONFIG% -jar %APP%

rem %JAVA_OPTS% %JAVA_DEBUG_OPTS%

pause
