--
-- PostgreSQL database dump
--

\restrict dTQHNFh68cNhVwl7FZrc8SQmhRc7dmngiFORxFSXS6h4gaGFmfO0nihBCxXATVG

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Subtask; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Subtask" (
    id text NOT NULL,
    title text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    priority text DEFAULT 'medium'::text NOT NULL,
    "taskId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Task" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    status text DEFAULT 'pending'::text NOT NULL,
    priority text DEFAULT 'medium'::text NOT NULL,
    "dueDate" timestamp(3) without time zone,
    "userId" text NOT NULL,
    "categoryId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Category" (id, name, "userId", "createdAt", "updatedAt") FROM stdin;
ca246019-765f-488f-ae8f-1322dbf0077e	Work	8aa79bac-15c1-4672-9c45-9a803181f0b1	2025-12-22 18:11:53.39	2025-12-22 18:11:53.39
4e55b44c-057d-40b6-915e-2cd1c989183a	School Management	8aa79bac-15c1-4672-9c45-9a803181f0b1	2025-12-22 18:13:19.979	2025-12-22 18:13:19.979
98914c94-e603-4925-9257-2c46aad74567	Mobile Development	8aa79bac-15c1-4672-9c45-9a803181f0b1	2025-12-30 19:02:23.453	2025-12-30 19:02:23.453
\.


--
-- Data for Name: Subtask; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Subtask" (id, title, status, priority, "taskId", "createdAt", "updatedAt") FROM stdin;
1583e671-5f41-4bfb-9595-09777a175f4d	Setting up the stage	pending	medium	9a9d563e-3210-47da-a98e-eab62950372d	2025-12-22 18:43:31.921	2025-12-22 18:43:31.921
8e31d670-2865-4b06-abf3-7eb446fb8988	Chores assignment	pending	medium	d882471b-8f58-4887-89ac-e4a813f68891	2025-12-22 18:46:53.729	2025-12-22 18:46:53.729
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Task" (id, title, description, status, priority, "dueDate", "userId", "categoryId", "createdAt", "updatedAt") FROM stdin;
d882471b-8f58-4887-89ac-e4a813f68891	Sports Day Planning	Planning for the intercounty sports day	pending	medium	2025-12-25 00:00:00	8aa79bac-15c1-4672-9c45-9a803181f0b1	4e55b44c-057d-40b6-915e-2cd1c989183a	2025-12-22 18:28:33.312	2025-12-22 18:36:07.571
9a9d563e-3210-47da-a98e-eab62950372d	Event Planning	Plan for the up-comming shxtngngs tour	pending	high	2025-12-25 00:00:00	8aa79bac-15c1-4672-9c45-9a803181f0b1	ca246019-765f-488f-ae8f-1322dbf0077e	2025-12-22 18:25:18.17	2025-12-22 18:37:09.953
aa6ffbdf-01cf-472a-bfdf-e67d6d702d7e	Web Development	Learning the design and development of websites	pending	medium	2026-01-01 12:00:00	8aa79bac-15c1-4672-9c45-9a803181f0b1	\N	2025-12-31 15:35:04.32	2025-12-31 15:35:04.32
0d5747fc-1465-4914-b850-081bac1aa4d7	DevOps	Intergrating kubernetes in my project	pending	medium	2026-01-02 12:00:00	8aa79bac-15c1-4672-9c45-9a803181f0b1	\N	2025-12-31 15:36:07.59	2025-12-31 15:36:07.59
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
8aa79bac-15c1-4672-9c45-9a803181f0b1	Isyrik	lilmumo006@gmail.com	$2b$10$Rv2YpFGN9DEb1NSH3QBMfuHL81ZCepwGM.OAZLbKG7Dyj1p2kAvoG	2025-11-25 18:31:19.022	2025-11-25 18:31:19.022
c2b653bb-06b5-4a46-acab-f96d83327b70	Savynik	justus.i.mumo@gmail.com	$2b$12$vlM9pJZ6R6rQ3p7I/qDieOp.iEeB.iDuU01ZfoGNGthQZUqmbpZ/.	2025-12-27 12:27:18.913	2025-12-27 12:27:18.913
8ed9d4a8-43cc-4c00-86c1-a0529489953b	wanzenza 	durk6123@gmail.com	$2b$12$tigF6KkyW36b4fuJXDU1pel9JE4kdImuF9fuA7xo7M4fT8pYOqrAG	2025-12-27 18:07:16.274	2025-12-27 18:07:16.274
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5c04db3c-396a-4f63-84d4-a36b5f1c1559	5e0d1b7dd628e5db7a6cea551107e77a1e0f14c53f300d0de985e90c09fd705b	2025-11-23 14:10:19.635838+00	20251123141017_init	\N	\N	2025-11-23 14:10:18.404896+00	1
\.


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Subtask Subtask_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subtask"
    ADD CONSTRAINT "Subtask_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_userId_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Category_userId_name_idx" ON public."Category" USING btree ("userId", name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Category Category_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Subtask Subtask_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subtask"
    ADD CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict dTQHNFh68cNhVwl7FZrc8SQmhRc7dmngiFORxFSXS6h4gaGFmfO0nihBCxXATVG

