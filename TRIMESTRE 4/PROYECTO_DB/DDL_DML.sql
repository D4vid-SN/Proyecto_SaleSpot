create database PROYECTO;
use PROYECTO;

create table tipo_documento
(
    tdoc varchar(10) not null,
    desc_tdoc varchar(30) not null,
    estado_tdoc boolean not null,
    primary key(tdoc)
);

create table roles
(
    cod_rol int not null,
    desc_rol varchar(30) not null,
    primary key(cod_rol)
);

create table persona
(
    pk_fk_tdoc varchar(10) not null,
    id_persona int not null,
    nomb_persona varchar(25) not null,
    nomb2_persona varchar(25) null,
    apell_persona varchar(25) not null,
    apell2_persona varchar(25) null,
    direccion_persona varchar(45) not null,
    primary key(pk_fk_tdoc, id_persona)
);

alter table persona
add constraint primera
foreign key(pk_fk_tdoc) references tipo_documento(tdoc);

create table persona_has_roles
(
    persona_tdoc varchar(10) not null,
    persona_id int not null,
    persona_rol int not null,
    estado_rol boolean not null,
    primary key(persona_tdoc,persona_id,persona_rol)
);

alter table persona_has_roles
add constraint segunda
foreign key(persona_tdoc,persona_id) references persona(pk_fk_tdoc,id_persona);

alter table persona_has_roles
add constraint seg
foreign key(persona_rol) references roles(cod_rol);

create table administrador
(
    tdoc_admin varchar(10) not null,
    id_admin int not null,
    pass varchar(60) not null,
    primary key(tdoc_admin,id_admin)
);

create table proveedor
(
    tdoc_proveedor varchar(10) not null,
    id_proveedor int not null,
    telefono bigint(15) not null,
    primary key(tdoc_proveedor,id_proveedor)
);

alter table proveedor
add constraint tercera
foreign key(tdoc_proveedor,id_proveedor) references persona(pk_fk_tdoc,id_persona);

create table empleado
(
    tdoc_empleado varchar(10) not null,
    id_empleado int not null,
    pass varchar(60) not null,
    primary key(tdoc_empleado,id_empleado)
);

alter table empleado
add constraint cuarta
foreign key(tdoc_empleado,id_empleado) references persona(pk_fk_tdoc,id_persona);

create table cliente
(
    tdoc_cliente varchar(10) not null,
    id_cliente int not null,
    primary key(tdoc_cliente,id_cliente)
);

create table productos
(
    cod_producto varchar(10) not null,
    desc_producto varchar(45) not null,
    valor_producto double not null,
    fk_tipo_prod varchar(20) not null,
    primary key(cod_producto)
);

create table tipo_producto
(
    tipo_prod varchar(20) not null,
    estado_tprod boolean not null,
    primary key(tipo_prod)
);

CREATE TABLE factura (
    n_factura INT NOT NULL,
    fecha_factura DATE NOT NULL,
    subtotal DOUBLE NOT NULL,
    iva DOUBLE NOT NULL,
    total_factura DOUBLE NOT NULL,
    PRIMARY KEY (n_factura)
);

ALTER TABLE cliente
ADD CONSTRAINT quinta
FOREIGN KEY (tdoc_cliente, id_cliente) REFERENCES persona (pk_fk_tdoc, id_persona);

CREATE TABLE factura_compra (
    n_factura_comp INT NOT NULL,
    empleado_tdoc VARCHAR(10) NOT NULL,
    empleado_id INT NOT NULL,
    proveedor_tdoc VARCHAR(10) NOT NULL,
    proveedor_id INT NOT NULL,
    PRIMARY KEY (n_factura_comp),
    CONSTRAINT sexta_fk1 FOREIGN KEY (n_factura_comp) REFERENCES factura (n_factura),
    CONSTRAINT sexta_fk2 FOREIGN KEY (empleado_tdoc, empleado_id) REFERENCES empleado (tdoc_empleado, id_empleado),
    CONSTRAINT sexta_fk3 FOREIGN KEY (proveedor_tdoc, proveedor_id) REFERENCES proveedor (tdoc_proveedor, id_proveedor)
);

CREATE TABLE factura_venta (
    n_factura_vent INT NOT NULL,
    cliente_tdoc VARCHAR(10) NOT NULL,
    cliente_id INT NOT NULL,
    empleado_tdoc_v VARCHAR(10) NOT NULL,
    empleado_id_v INT NOT NULL,
    PRIMARY KEY (n_factura_vent),
    CONSTRAINT sexta_fk4 FOREIGN KEY (n_factura_vent) REFERENCES factura (n_factura),
    CONSTRAINT sexta_fk5 FOREIGN KEY (cliente_tdoc, cliente_id) REFERENCES cliente (tdoc_cliente, id_cliente),
    CONSTRAINT sexta_fk6 FOREIGN KEY (empleado_tdoc_v, empleado_id_v) REFERENCES empleado (tdoc_empleado, id_empleado)
);

CREATE TABLE factura_productos (
    fk_pk_n_factura INT NOT NULL,
    fk_pk_cod_producto VARCHAR(10) NOT NULL,
    cantidad_prod INT NOT NULL,
    valor_prod_cant DOUBLE NOT NULL,
    PRIMARY KEY (fk_pk_cod_producto, fk_pk_n_factura),
    CONSTRAINT octava_fk1 FOREIGN KEY (fk_pk_n_factura) REFERENCES factura (n_factura),
    CONSTRAINT octava_fk2 FOREIGN KEY (fk_pk_cod_producto) REFERENCES productos (cod_producto)
);

ALTER TABLE productos
ADD CONSTRAINT novena
FOREIGN KEY (fk_tipo_prod) REFERENCES tipo_producto (tipo_prod);


insert into tipo_documento (tdoc, desc_tdoc, estado_tdoc)
values
('TI', 'Tarjeta de identidad', 1),
('CC', 'Cedula de ciudadania', 1),
('CE', 'Cedula de extranjeria', 1);

insert into roles(cod_rol,desc_rol)
values
(10,'Empleado'),
(20,'Proveedor'),
(30,'Cliente'),
(40,'Administrador');

insert into persona(pk_fk_tdoc,id_persona,nomb_persona,nomb2_persona,apell_persona,apell2_persona,direccion_persona)
values
('CC',1025489789,'Juan','Antonio','Rodriguez','Calderón','Cll 78 # 25-30'),
('CC',1000154678,'Carlos','Andres','Lozano','Medina','Cll 48 # 23-30'),
('CC',1025545522,'Rodrigo','Alberto','Acuña','Florez','Cll 20 # 25-20'),
('CC',1000089789,'Ana','Maria','Buitrago','Ordoñez','Cll 25 # 78-30'),
('CC',1001010101,'Mirian','','Cruz','Cardona','Cll 100 # 25-30'),
('CC',1022222222,'Nicol','Liliana','Giraldo','Torrez','Cll 101 # 25-30'),
('CC',1023333333,'Fabian','Andres','Rodriguez','Cruz','Cll 103 # 35-30');

insert into proveedor(tdoc_proveedor,id_proveedor,telefono)
values
('CC',1025545522,3125497),
('CC',1000089789,3154879),
('CC',1001010101,3215789);

insert into empleado(tdoc_empleado,id_empleado)
values
('CC',1025489789),
('CC',1000154678);

insert into cliente(tdoc_cliente,id_cliente)
values
('CC',1022222222),
('CC',1023333333);

INSERT INTO persona_has_roles(persona_tdoc, persona_id, persona_rol, estado_rol)
VALUES
('CC', 1025545522, 20, 1),
('CC', 1000154678, 20, 1),
('CC', 1001010101, 20, 1),
('CC', 1025489789, 10, 1),
('CC', 1000154678, 10, 1),
('CC', 1022222222, 30, 1),
('CC', 1023333333, 30, 1);

insert into tipo_producto(tipo_prod,estado_tprod)
values
('cartón',1),
('plastico',2);

insert into productos(cod_producto,desc_producto,valor_producto,fk_tipo_prod)
values
(1,'Bolsa de cartón',800000,'cartón'),
(2,'Bolsa plastica',800000,'plastico');

insert into factura(n_factura, fecha_factura, subtotal, iva, total_factura)
values
(10, '2023-10-10', 100000, '10%', 110000),
(20, '2023-10-10', 200000, '10%', 220000),
(30, '2023-10-10', 200000, '10%', 220000),
(40, '2023-10-10', 200000, '10%', 220000),
(50, '2023-10-10', 200000, '10%', 220000);

insert into factura_venta(n_factura_vent,cliente_tdoc,cliente_id,empleado_tdoc_v,empleado_id_v)
values
(10,'CC',1022222222,'CC',1025489789),
(20,'CC',1023333333,'CC',1000154678);

insert into factura_compra(n_factura_comp, empleado_tdoc, empleado_id, proveedor_tdoc, proveedor_id)
values
(30,'CC',1025489789,'CC',1025545522),
(40,'CC',1025489789,'CC',1000089789),
(50,'CC',1000154678,'CC',1001010101);

insert into factura_productos(fk_pk_n_factura, fk_pk_cod_producto, cantidad_prod, valor_prod_cant)
values
(10,1,10,800000),
(20,2,36,220000),
(30,1,24,220000),
(40,1,15,220000),
(50,2,9,2800000);

SELECT * FROM persona;

SELECT id_proveedor FROM proveedor;

