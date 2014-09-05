create table college (
	id			bigint			primary key
,	name		varchar(256)	not null
);

create table college_faculty (
	id		bigint			primary key
,	name	varchar(512)	not null
);

create table college_major (
	id		bigint			primary key
,	name	varchar(512)	not null
);

create table college_degree (
	id		bigint			primary key
,	name	varchar(128)	not null
);

create table source_info (
	id		bigint			primary key
,	name	varchar(256)	not null
);

create table payment_type (
	id		bigint			primary key
,	name	varchar(128)	not null
);

create table payment_lot (
	id		bigint			primary key
,	name	varchar(128)	not null
);

create table bank (
	id		bigint			primary key
,	name	varchar(128)	not null
);

create table customer (
	id					bigint			primary key
,	_user_id			bigint			not null
,	ts					timestamp		not null

,	name				varchar(256)	not null
,	phone				varchar(32)		not null
,	address				varchar(1024)	null
,	college_id			bigint			null
,	college_faculty_id	bigint			null
,	college_major_id	bigint			null
,	college_degree_id	bigint			null
,	company_name		varchar(128)	null
,	source_info_id		bigint			null
,	source_info_others	varchar(512)	null

,	respondent_number	int				default 0
,	item_number			int				default 0
,	using_analysis_data	int				default 0
,	using_consultation	int				default 0
,	cost_others			numeric(10,2)	default 0.0
,	cost_total			numeric(10,2)	default 0.0

,	payment_1			numeric(10,2)	default 0.0
,	payment_2			numeric(10,2)	default 0.0
,	payment_3			numeric(10,2)	default 0.0
,	payment_full		numeric(10,2)	default 0.0
);

create table customer_payment (
	id					bigint			primary key
,	_user_id			bigint			not null
,	ts					timestamp		not null

,	customer_id			bigint			not null
,	payment_lot_id		bigint			not null
,	payment_type_id		bigint			not null

,	transfer_bank_id	bigint			null
,	transfer_account	varchar(256)	null

,	debit_bank_id		bigint			null
,	debit_card			varchar(256)	null
);

insert into college values 
 (1, "ITB")
,(2, "UNPAD")
,(3, "UPI")
,(4, "UIN Sunan Gunung Djati")
,(5, "POLMAN")
,(6, "POLBAN")
,(7, "STT Tekstil")
,(8, "Sekolah Tinggi Pariwisata Bandung");

insert into college_faculty values
 (1, "MIPA");

insert into college_major values
 (1, "Matematika");

insert into college_degree values
 (1, "Diploma (D1, D2, D3, D4)")
,(2, "Sarjana (S1)")
,(3, "Magister (S2)")
,(4, "Doktoral (S3)");

insert into source_info values
 (1, "Teman")
,(2, "Plang")
,(3, "Selebaran/Pamflet/Brosur")
,(4, "Media Sosial")
,(5, "Situs Daring");

insert into payment_type values
 (1, "Tunai")
,(2, "Transfer Rekening")
,(3, "Debit");

insert into payment_lot values
 (1, "DP 1")
,(2, "DP 2")
,(3, "DP 3")
,(4, "Pelunasan");

insert into bank values
 (1, "BCA")
,(2, "BNI")
,(3, "Mandiri")
,(4, "BRI");

insert into _menu
(_profile_id ,id ,pid ,type ,label ,icon ,image ,module ,description)
values
 (1	,900	,0		,0		,"Referensi"			,"reference"	,""						,"References"					,"")
,(1	,901	,900	,3		,"Perguruan Tinggi"		,"reference"	,"icons/reference.svg"	,"References_College"			,"")
,(1	,902	,900	,3		,"Fakultas"				,"reference"	,"icons/reference.svg"	,"References_CollegeFaculty"	,"")
,(1	,903	,900	,3		,"Jurusan"				,"reference"	,"icons/reference.svg"	,"References_CollegeMajor"		,"")
,(1	,904	,900	,3		,"Jenjang Pendidikan"	,"reference"	,"icons/reference.svg"	,"References_CollegeDegree"		,"")
,(1	,905	,900	,3		,"Sumber Informasi"		,"reference"	,"icons/reference.svg"	,"References_SourceInfo"		,"")
,(1	,906	,900	,3		,"Jenis Pembayaran"		,"reference"	,"icons/reference.svg"	,"References_PaymentType"		,"")
,(1	,907	,900	,3		,"Kelompok Pembayaran"	,"reference"	,"icons/reference.svg"	,"References_PaymentLot"		,"")
,(1	,908	,900	,3		,"Bank"					,"reference"	,"icons/reference.svg"	,"References_Bank"				,"");

insert into _group_menu
(_group_id	,_menu_id	,permission)
values
 (1			,900		,4)
,(1			,901		,4)
,(1			,902		,4)
,(1			,903		,4)
,(1			,904		,4)
,(1			,905		,4)
,(1			,906		,4)
,(1			,907		,4)
,(1			,908		,4);
