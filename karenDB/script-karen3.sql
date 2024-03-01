create database karen3;
use karen3;
create table clientes(
id_clientes int4 not null primary key,
nombre varchar(60) not null,
apellidos varchar(60) not null,
correo_electronico varchar(60) not null,
direccion_residencia varchar(60) not null,
id_pedido int4 not null);

create table pedidos(
id_pedido int4 not null primary key,
detalles_pedido varchar(200) not null,
estado_pedido varchar(100) not null,
id_clientes int4 not null);

create table detallesventa(
id_ventas int4 not null primary key,
detalles_venta varchar(200) not null);

create table ventas(
precio_total int4 not null,
num_productos int4 not null,
id_ventas int4 not null);

create table productos(
id_producto int4 not null primary key,
descripcion varchar(200) not null,
precio int4 not null,
nombre_producto varchar(200) not null);

create table repartidor(
id_repartidor int4 not null primary key,
nombre varchar(60) not null,
apellidos varchar(60) not null,
num_contacto int4 not null,
comentario varchar(200) not null,
id_pedido int4 not null);

show tables;

alter table clientes add constraint fk_pedidos_clientes
foreign key(id_pedido)
references pedidos(id_pedido) on delete no action on update no action;

alter table ventas add constraint fk_detallesventa_ventas
foreign key(id_ventas)
references detallesventa(id_ventas);

alter table ventas add id_producto int4;

describe ventas;

alter table ventas add constraint fk_productos_ventas
foreign key(id_producto)
references productos(id_producto);

alter table repartidor add constraint fk_pedidos_repartidor
foreign key(id_pedido)
references pedidos(id_pedido);

show tables;
describe repartidor;
use karen3;
show tables;
describe clientes;
select*from clientes;







