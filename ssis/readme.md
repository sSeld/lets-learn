# SSIS (Sql Server Integration Services)


## Getting Started

Run ``docker-compose up -d`` to started the database container. We will use this database for integrations.

docker run --name SQLServer -d -p 1433:1433 --volume c:\Docker\Volumes\SQLServer:/var/opt/mssql/data -e SA_PASSWORD=Password1223 -e ACCEPT_EULA=Y mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04


SQL Server Files 

They are located on a docker volume at ``c:\docker\volumes\sqlserver``


https://github.com/Microsoft/sql-server-samples/releases/tag/wide-world-importers-v1.0
https://docs.microsoft.com/en-us/sql/linux/tutorial-restore-backup-in-sql-server-container?view=sql-server-ver15



RESTORE FILELISTONLY FROM DISK = '/var/opt/mssql/backup/AdventureWorks2019.bak';
RESTORE DATABASE AdventureWorks FROM DISK = '/var/opt/mssql/backup/AdventureWorks2019.bak' WITH MOVE 'AdventureWorks2017' TO '/var/opt/mssql/data/AdventureWorks2017.mdf', MOVE 'AdventureWorks2017_log' TO '/var/opt/mssql/data/AdventureWorks2017_log.mdf';



You have to use the MOVE with logical name to get it to work, otherwise it will look for the existing path in the bak.