call mvn install:install-file ^
	-Dfile=joyaop-1.0.jar ^
	-DgroupId=net.sf ^
	-DartifactId=joyaop ^
	-Dversion=1.0 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=joyaop-1.0.1.jar ^
	-DgroupId=net.sf ^
	-DartifactId=joyaop ^
	-Dversion=1.0.1 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=jai_core.1.1.3.jar ^
	-DgroupId=com.sun ^
	-DartifactId=jai-core ^
	-Dversion=1.1.3 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=jai_codec.1.1.3.jar ^
	-DgroupId=com.sun ^
	-DartifactId=jai_codec ^
	-Dversion=1.1.3 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=jai_imageio.jar ^
	-DgroupId=javax.media ^
	-DartifactId=jai_imageio ^
	-Dversion=1.1.3 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=jai_mlibwrapper.jar ^
	-DgroupId=javax.media ^
	-DartifactId=mlibwrapper_jai ^
	-Dversion=1.1.3 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=google-zxing.jar ^
	-DgroupId=zxing ^
	-DartifactId=client ^
	-Dversion=1 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=google-zxing-core.jar ^
	-DgroupId=zxing ^
	-DartifactId=core ^
	-Dversion=1 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=iface-connector-main-3.13.0.jar ^
	-DgroupId=innovatrics ^
	-DartifactId=iface-connector-main ^
	-Dversion=3.13.0 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=sdk-commons-main-1.2.0.jar ^
	-DgroupId=innovatrics ^
	-DartifactId=sdk-commons-main ^
	-Dversion=1.2.0 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=iText-2.1.7.js2.jar ^
	-DgroupId=com.lowagie ^
	-DartifactId=itext ^
	-Dversion=2.1.7.js2 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=jasperreports-5.6.0.jar ^
	-DgroupId=net.sf.jasperreports ^
	-DartifactId=jasperreports ^
	-Dversion=5.6.0 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=htmlwriter-1.0.0.jar ^
	-DgroupId=microservice ^
	-DartifactId=htmlwriter ^
	-Dversion=1.0.0 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=validations-1.2.8.jar ^
	-DgroupId=validations ^
	-DartifactId=validations ^
	-Dversion=1.2.8 ^
	-Dpackaging=jar

call mvn install:install-file ^
	-Dfile=workflow-1.2.3.jar ^
	-DgroupId=workflow ^
	-DartifactId=workflow ^
	-Dversion=1.2.3 ^
	-Dpackaging=jar
