--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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
-- Name: tipuri_analize; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipuri_analize AS ENUM (
    'HEMATOLOGIE',
    'BIOCHIMIE',
    'HORMONI',
    'IMUNOLOGIE',
    'BACTERIOLOGICE'
);


ALTER TYPE public.tipuri_analize OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: analize_medicale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.analize_medicale (
    id_analize integer NOT NULL,
    nume character varying(50) NOT NULL,
    descriere character varying(100) NOT NULL,
    poza_analiza character varying(400),
    categorie_analize public.tipuri_analize DEFAULT 'HEMATOLOGIE'::public.tipuri_analize NOT NULL,
    pret integer NOT NULL,
    pacient_peste_18_ani boolean NOT NULL,
    data_adaugarii date,
    tip_analiza character varying(100),
    necesita_luare_de_sange character varying(3) NOT NULL
);


ALTER TABLE public.analize_medicale OWNER TO postgres;

--
-- Name: analize_medicale_id_analize_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.analize_medicale_id_analize_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.analize_medicale_id_analize_seq OWNER TO postgres;

--
-- Name: analize_medicale_id_analize_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.analize_medicale_id_analize_seq OWNED BY public.analize_medicale.id_analize;


--
-- Name: analize_medicale id_analize; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analize_medicale ALTER COLUMN id_analize SET DEFAULT nextval('public.analize_medicale_id_analize_seq'::regclass);


--
-- Data for Name: analize_medicale; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.analize_medicale (id_analize, nume, descriere, poza_analiza, categorie_analize, pret, pacient_peste_18_ani, data_adaugarii, tip_analiza, necesita_luare_de_sange) FROM stdin;
1	APTT	Descriere APTT	buypt.com/assets/img/products/5cc.jpg	HEMATOLOGIE	18	t	2021-06-25	La laborator	DA
2	Crioglobuline	Descriere Crioglobuline	buypt.com/assets/img/products/5cc.jpg	HEMATOLOGIE	12	f	2021-06-25	La laborator	DA
3	Determinare de grup sangvin	Calcitonina este un hormon secretat de anumite celule ale glandei tiroide	buypt.com/assets/img/products/5cc.jpg	HEMATOLOGIE	15	f	2021-06-25	La laborator	DA
4	Acid urid seric	Acidul uric reprezinta produsul final de catabolizare a nucleoproteinelor.	buypt.com/assets/img/products/5cc.jpg	BIOCHIMIE	11	t	2021-06-25	La laborator	DA
5	Amilazemie	Amilaza este o enzima care se gaseste in saliva si sucul pancreatic ajutand la digestia amidonului	buypt.com/assets/img/products/5cc.jpg	BIOCHIMIE	14	t	2021-06-25	La laborator	DA
6	Bilirubina totala	Bilirubina si biliverdina sunt pigmenti biliari, reprezinta produsii de degradare ai hemoglobinei	buypt.com/assets/img/products/5cc.jpg	BIOCHIMIE	11	t	2021-06-25	La laborator	DA
7	Calcitonina	Calcitonina este un hormon secretat de anumite celule ale glandei tiroide	buypt.com/assets/img/products/5cc.jpg	HORMONI	65	f	2021-06-25	La laborator	DA
8	Cortizol seric	Descriere Cortizol seric	buypt.com/assets/img/products/5cc.jpg	HORMONI	40	f	2021-06-25	Acasa	DA
9	Estradiol II (ELFA)	Sunt hormoni care regleaza dezvoltarea sexuala a femeii	buypt.com/assets/img/products/5cc.jpg	HORMONI	42	f	2021-06-25	La laborator	DA
10	Alergotest cantitativ mixt	Se recomanda in diagnosticarea alergiei si identificarea alergenului	buypt.com/assets/img/products/5cc.jpg	IMUNOLOGIE	220	t	2021-06-27	La laborator	DA
11	Alergotest cantitativ pediatric	Se recomanda in diagnosticarea alergiei si identificarea alergenului	buypt.com/assets/img/products/5cc.jpg	IMUNOLOGIE	220	f	2021-06-27	La laborator	DA
12	ASLO cantitativ	Organismul uman raspunde la infectia streptococica, prin sinteza de anticorpi..	buypt.com/assets/img/products/5cc.jpg	IMUNOLOGIE	25	f	2021-06-27	La laborator	DA
13	ASLO semicantitativ	Organismul uman raspunde la infectia streptococica, prin sinteza de anticorpi..	buypt.com/assets/img/products/5cc.jpg	IMUNOLOGIE	25	f	2021-06-27	La laborator	DA
14	Exsudat faringian (cultura+ antibiogramă)	Aceste analize constau in examinarea florei bacteriene a mucoaselor	buypt.com/assets/img/products/5cc.jpg	BACTERIOLOGICE	36	t	2021-06-27	La laborator	NU
15	Exsudat faringian – cultură fungi+antifungigrama)	Aceste analize constau in examinarea florei bacteriene a mucoaselor	buypt.com/assets/img/products/5cc.jpg	BACTERIOLOGICE	36	t	2021-06-27	La laborator	NU
16	Exsudat nazal ( cultura+antibiograma)	Examinarea florei bacteriene a mucoaselor căilor respiratorii	buypt.com/assets/img/products/5cc.jpg	BACTERIOLOGICE	36	t	2021-06-27	La laborator	NU
\.


--
-- Name: analize_medicale_id_analize_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.analize_medicale_id_analize_seq', 16, true);


--
-- Name: analize_medicale analize_medicale_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.analize_medicale
    ADD CONSTRAINT analize_medicale_pkey PRIMARY KEY (id_analize);


--
-- PostgreSQL database dump complete
--

