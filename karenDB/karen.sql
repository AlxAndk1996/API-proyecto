show databases;
use karen;
show tables;
describe clientes;
create procedure insertarCliente(
in id_cliente int(11),
in nombre varchar(100),
in apellidos varchar(100),
in documento int(15),
in telefono int(15)
)
begin
	if id_clientes = 0 then
		insert into clientes (nombre, apellidos, documento, telefono)
		values (_nombre, _apellidos, _documento, _telefono);
		set id_cliente = last_insert_id();
	else 
		update clientes
        set 
        nombre = nombre,
        apellidos = apellidos,
        documento = documento,
        telefono = telefono
        where id = id_cliente
	end if;
    SELECT id_cliente AS id;
end$$
insertarCliente
