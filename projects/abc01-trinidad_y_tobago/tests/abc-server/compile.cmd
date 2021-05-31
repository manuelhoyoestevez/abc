@echo off

title ABC Server

rem set tldrive=%~d0
rem set JAVA_HOME="%tldrive%\Program Files\Java\jre1.8.0_291"
rem set JAVA=%JAVA_HOME%\bin\java.exe
rem set ANT_HOME="%tldrive%\Software\apache-ant-1.10.10"
rem set ANT=%ANT_HOME%\bin\ant.bat

set JAVA=java
set ANT=ant

set REPO=.\..\..\..\..\repos\server
set LIBS=%REPO%\libs
set DIST=%REPO%\dist
set CONFIG=.\resources\config
set JAVA_OPTS=-server -Xms128m -Xmx512m -Xss1024k -XX:+UseAdaptiveSizePolicy -XX:+UseParallelGC -XX:+UseParallelOldGC -XX:ParallelGCThreads=2 -Djava.awt.headless=true -Djava.net.preferIPv4Stack=true

echo "Compiling..."
call %ANT% -buildfile %REPO% create-jar

rem @echo on

dir %REPO%\dist *.jar /b /a-d > lastjarfile.temp
set /p JARFILE=<lastjarfile.temp
del lastjarfile.temp
set APP=%REPO%\dist\%JARFILE%

echo "Compiled: %APP%!"

%JAVA% %JAVA_OPTS% -Dlibs=%LIBS% -Dconfig=%CONFIG% -jar %APP%

pause
