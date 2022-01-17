--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO gitpod;

--
-- Name: bot; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.bot (
    id integer NOT NULL,
    respuesta character varying(120) NOT NULL,
    paciente_id integer,
    fecha timestamp without time zone
);


ALTER TABLE public.bot OWNER TO gitpod;

--
-- Name: bot_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.bot_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bot_id_seq OWNER TO gitpod;

--
-- Name: bot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.bot_id_seq OWNED BY public.bot.id;


--
-- Name: paciente; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.paciente (
    id integer NOT NULL,
    telefono character varying(12) NOT NULL,
    psicologo_id integer,
    fecha_nacimiento date,
    nombre character varying(120) NOT NULL,
    email character varying(120) NOT NULL,
    direccion character varying(120),
    "diagnóstico" character varying(120),
    estado_civil character varying(120),
    nro_hijos integer,
    nacionalidad character varying(120),
    username character varying(120)
);


ALTER TABLE public.paciente OWNER TO gitpod;

--
-- Name: paciente_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.paciente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.paciente_id_seq OWNER TO gitpod;

--
-- Name: paciente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.paciente_id_seq OWNED BY public.paciente.id;


--
-- Name: psicologo; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.psicologo (
    id integer NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(80) NOT NULL,
    nombre character varying(120) NOT NULL,
    telefono character varying(12) NOT NULL,
    direccion_comercial character varying(120) NOT NULL
);


ALTER TABLE public.psicologo OWNER TO gitpod;

--
-- Name: psicologo_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.psicologo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.psicologo_id_seq OWNER TO gitpod;

--
-- Name: psicologo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.psicologo_id_seq OWNED BY public.psicologo.id;


--
-- Name: bot id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.bot ALTER COLUMN id SET DEFAULT nextval('public.bot_id_seq'::regclass);


--
-- Name: paciente id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.paciente ALTER COLUMN id SET DEFAULT nextval('public.paciente_id_seq'::regclass);


--
-- Name: psicologo id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.psicologo ALTER COLUMN id SET DEFAULT nextval('public.psicologo_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.alembic_version (version_num) FROM stdin;
b418a1fed5fb
\.


--
-- Data for Name: bot; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.bot (id, respuesta, paciente_id, fecha) FROM stdin;
4	😞	2	2021-12-30 23:20:48
5	😃	3	2021-12-30 23:25:43
6	😃	4	2021-12-30 23:27:03
7	😞	4	2021-12-30 23:27:23
8	😐	4	2021-12-30 23:27:29
9	😞	4	2021-12-30 23:27:46
10	😞	4	2021-12-30 23:27:48
11	😃	4	2021-12-30 23:27:50
12	😐	4	2021-12-30 23:27:52
13	😞	2	2021-12-30 23:30:04
14	😞	2	2022-01-04 00:40:44
15	😐	2	2022-01-04 00:49:55
16	😐	3	2022-01-04 00:50:26
17	😃	2	2022-01-04 00:50:33
18	😐	3	2022-01-04 00:51:11
19	😐	3	2022-01-04 00:51:13
20	😐	3	2022-01-04 00:51:19
21	😐	3	2022-01-04 00:51:50
22	😞	3	2022-01-04 00:56:46
23	😞	3	2022-01-04 00:56:51
24	😃	2	2022-01-04 23:19:11
\.


--
-- Data for Name: paciente; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.paciente (id, telefono, psicologo_id, fecha_nacimiento, nombre, email, direccion, "diagnóstico", estado_civil, nro_hijos, nacionalidad, username) FROM stdin;
2	930078982	2	\N	Germán	germanguaimare@gmail.com	Nataniel Cox 683	\N	Región Metropolitana	\N	\N	gguaimare
3	123456	2	\N	Saray	saray@gmail.com	\N	\N	\N	\N	\N	sarybudin
4	1234567	\N	\N	Maca	maca@gmail.com	\N	\N	\N	\N	\N	MacaRebolledo
\.


--
-- Data for Name: psicologo; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.psicologo (id, email, password, nombre, telefono, direccion_comercial) FROM stdin;
2	psicologo@gmail.com	123456	Psicologo Prueba	123456	Santiago
\.


--
-- Name: bot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.bot_id_seq', 24, true);


--
-- Name: paciente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.paciente_id_seq', 4, true);


--
-- Name: psicologo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.psicologo_id_seq', 2, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: bot bot_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.bot
    ADD CONSTRAINT bot_pkey PRIMARY KEY (id);


--
-- Name: paciente paciente_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_email_key UNIQUE (email);


--
-- Name: paciente paciente_nombre_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_nombre_key UNIQUE (nombre);


--
-- Name: paciente paciente_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_pkey PRIMARY KEY (id);


--
-- Name: paciente paciente_telefono_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_telefono_key UNIQUE (telefono);


--
-- Name: psicologo psicologo_direccion_comercial_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.psicologo
    ADD CONSTRAINT psicologo_direccion_comercial_key UNIQUE (direccion_comercial);


--
-- Name: psicologo psicologo_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.psicologo
    ADD CONSTRAINT psicologo_email_key UNIQUE (email);


--
-- Name: psicologo psicologo_nombre_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.psicologo
    ADD CONSTRAINT psicologo_nombre_key UNIQUE (nombre);


--
-- Name: psicologo psicologo_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.psicologo
    ADD CONSTRAINT psicologo_pkey PRIMARY KEY (id);


--
-- Name: psicologo psicologo_telefono_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.psicologo
    ADD CONSTRAINT psicologo_telefono_key UNIQUE (telefono);


--
-- Name: bot bot_paciente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.bot
    ADD CONSTRAINT bot_paciente_id_fkey FOREIGN KEY (paciente_id) REFERENCES public.paciente(id);


--
-- Name: paciente paciente_psicologo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_psicologo_id_fkey FOREIGN KEY (psicologo_id) REFERENCES public.psicologo(id);


--
-- PostgreSQL database dump complete
--

