--
-- PostgreSQL database dump
--


-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 17.7 (Ubuntu 17.7-0ubuntu0.25.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET LOCAL search_path = public, pg_catalog;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: EXReflexStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."EXReflexStatus" AS ENUM (
    'active',
    'disabled',
    'draft'
);


--
-- Name: EXReflexType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."EXReflexType" AS ENUM (
    'unconditional',
    'conditional'
);


--
-- Name: IncidentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."IncidentStatus" AS ENUM (
    'open',
    'resolved',
    'ignored'
);


--
-- Name: KBConceptVisibility; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBConceptVisibility" AS ENUM (
    'public',
    'hidden',
    'unpublished'
);


--
-- Name: KBConflictStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBConflictStatus" AS ENUM (
    'open',
    'resolved',
    'dismissed'
);


--
-- Name: KBDecisionStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBDecisionStatus" AS ENUM (
    'superseded',
    'context_invalid',
    'still_valid'
);


--
-- Name: KBFactProjectionVisibility; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBFactProjectionVisibility" AS ENUM (
    'visible',
    'hidden'
);


--
-- Name: KBFactStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBFactStatus" AS ENUM (
    'unverified',
    'tentative',
    'verified',
    'disputed',
    'deprecated'
);


--
-- Name: KBFactType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBFactType" AS ENUM (
    'raw',
    'derived'
);


--
-- Name: KBIdentityOperationType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBIdentityOperationType" AS ENUM (
    'merge',
    'split'
);


--
-- Name: KBKnowledgeSpaceType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBKnowledgeSpaceType" AS ENUM (
    'private',
    'shared',
    'public'
);


--
-- Name: KBLabelRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBLabelRole" AS ENUM (
    'primary',
    'synonym',
    'alias',
    'abbreviation'
);


--
-- Name: KBProposalStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."KBProposalStatus" AS ENUM (
    'untested',
    'tested',
    'confirmed',
    'rejected'
);


--
-- Name: LetterStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."LetterStatus" AS ENUM (
    'Created',
    'Processing',
    'Sended',
    'Error'
);


--
-- Name: LogLevel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."LogLevel" AS ENUM (
    'Info',
    'Notice',
    'Warning',
    'Error',
    'Fatal'
);


--
-- Name: MentorMenteeStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MentorMenteeStatus" AS ENUM (
    'Request',
    'Accepted',
    'Rejected'
);


--
-- Name: MindLogType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."MindLogType" AS ENUM (
    'Stimulus',
    'Reaction',
    'Action',
    'Error',
    'Result',
    'Conclusion',
    'Evaluation',
    'Correction',
    'Knowledge',
    'Identity',
    'Context',
    'Relationship'
);


--
-- Name: PostStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PostStatus" AS ENUM (
    'draft',
    'published',
    'unpublished'
);


--
-- Name: ProjectMemberStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ProjectMemberStatus" AS ENUM (
    'Invited',
    'Active',
    'Fired',
    'Quit'
);


--
-- Name: ProjectStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ProjectStatus" AS ENUM (
    'New',
    'Accepted',
    'Rejected',
    'Processing',
    'Completed',
    'Reopened'
);


--
-- Name: ProjectType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ProjectType" AS ENUM (
    'Education'
);


--
-- Name: RedirectPatternType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RedirectPatternType" AS ENUM (
    'regex',
    'prefix',
    'exact'
);


--
-- Name: ResourceType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ResourceType" AS ENUM (
    'Blog',
    'Comment',
    'PersonalBlog',
    'Project',
    'Resource',
    'Service',
    'Team',
    'Topic'
);


--
-- Name: SystemLogLevel; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SystemLogLevel" AS ENUM (
    'error',
    'warning',
    'info',
    'debug'
);


--
-- Name: SystemLogSource; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SystemLogSource" AS ENUM (
    'client',
    'server',
    'api'
);


--
-- Name: TagStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TagStatus" AS ENUM (
    'Active',
    'Moderated',
    'Blocked'
);


--
-- Name: TaskMemberStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TaskMemberStatus" AS ENUM (
    'Invited',
    'Active',
    'Fired',
    'Quit'
);


--
-- Name: TaskReactionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TaskReactionType" AS ENUM (
    'UpVote',
    'DownVote'
);


--
-- Name: TaskStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TaskStatus" AS ENUM (
    'New',
    'Accepted',
    'Rejected',
    'Progress',
    'Paused',
    'Done',
    'Discuss',
    'Approved',
    'RevisionsRequired',
    'Completed'
);


--
-- Name: TeamMemberStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TeamMemberStatus" AS ENUM (
    'Invited',
    'Active',
    'Fired',
    'Applied',
    'Rejected'
);


--
-- Name: TeamStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TeamStatus" AS ENUM (
    'Active',
    'Inactive'
);


--
-- Name: TechnologyLessonUserStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TechnologyLessonUserStatus" AS ENUM (
    'Accepted',
    'Completed'
);


--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TransactionType" AS ENUM (
    'TopUp',
    'TransferOut',
    'TransferIn'
);


--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserStatus" AS ENUM (
    'newbie',
    'active',
    'blocked'
);


--
-- Name: UserTechnologyHiringStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserTechnologyHiringStatus" AS ENUM (
    'Active',
    'Neutral',
    'Negative'
);


--
-- Name: UserTechnologyStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserTechnologyStatus" AS ENUM (
    'PlanToStudy',
    'RefusedToStudy',
    'Study',
    'RarelyUse',
    'ActiveUse',
    'NoLongerUse'
);


--
-- Name: userType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."userType" AS ENUM (
    'Human',
    'AI'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Balance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Balance" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    amount double precision DEFAULT 0 NOT NULL,
    "userId" character varying(36) NOT NULL
);


--
-- Name: Career; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Career" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text,
    description text,
    start_date timestamp(3) without time zone,
    "CreatedBy" character varying(36)
);


--
-- Name: ChatMessage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ChatMessage" (
    id character varying(36) NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mood double precision DEFAULT 0 NOT NULL,
    assertiveness double precision DEFAULT 0 NOT NULL,
    "intentTone" double precision DEFAULT 0 NOT NULL,
    "socialGoal" text,
    tags text,
    usage jsonb,
    "createdBy" character varying(36) NOT NULL,
    "toUserId" character varying(36)
);


--
-- Name: ChatMessageOld; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ChatMessageOld" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content jsonb,
    "contentText" text,
    "CreatedBy" character varying(36),
    "Room" character varying(36),
    "toUser" character varying(36)
);


--
-- Name: ChatRoom; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ChatRoom" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    description text,
    image text,
    code character varying(36),
    "isPublic" boolean,
    "CreatedBy" character varying(36)
);


--
-- Name: CodeChallenge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CodeChallenge" (
    id character varying(36) NOT NULL,
    "externalKey" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text,
    "dashedName" text,
    "localeTitle" text,
    description text,
    "challengeType" integer,
    "forumTopicId" integer,
    translations jsonb,
    tests jsonb,
    solutions jsonb,
    instructions text,
    files jsonb,
    "videoUrl" text,
    "order" integer,
    "superOrder" integer,
    "challengeOrder" integer,
    required jsonb,
    "isRequired" boolean,
    "isPrivate" boolean,
    "isBeta" boolean,
    template text,
    "time" text,
    rank integer,
    "Block" character varying(36),
    "CreatedBy" character varying(36),
    "Topic" character varying(36)
);


--
-- Name: CodeChallengeBlock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CodeChallengeBlock" (
    id character varying(36) NOT NULL,
    "externalKey" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text,
    rank integer,
    "CreatedBy" character varying(36),
    "Parent" character varying(36)
);


--
-- Name: CodeChallengeCompletion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CodeChallengeCompletion" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Task" character varying(36),
    "CreatedBy" character varying(36),
    "CodeChallenge" character varying(36),
    content text,
    success boolean
);


--
-- Name: EXReaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EXReaction" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "reflexId" character varying(36) NOT NULL,
    stimulus text NOT NULL,
    result text NOT NULL,
    "tokensUsed" integer,
    "durationMs" integer,
    "scoreAgent" double precision,
    "scoreTarget" double precision,
    "scoreMentor" double precision,
    feedback text,
    "createdById" character varying(36) NOT NULL,
    "relatedToUserId" character varying(36)
);


--
-- Name: EXReflex; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EXReflex" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."EXReflexType" DEFAULT 'conditional'::public."EXReflexType" NOT NULL,
    status public."EXReflexStatus" DEFAULT 'active'::public."EXReflexStatus" NOT NULL,
    stimulus text NOT NULL,
    response text NOT NULL,
    effectiveness double precision,
    "executionRate" double precision,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: EthAccount; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EthAccount" (
    id character varying(36) NOT NULL,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address character varying(42) NOT NULL,
    "userId" character varying(36)
);


--
-- Name: EthTransaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EthTransaction" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" character varying(36) NOT NULL,
    "chainId" integer NOT NULL,
    "txHash" character varying(66) NOT NULL,
    "from" character varying(42) NOT NULL,
    "to" character varying(42) NOT NULL,
    amount double precision NOT NULL,
    "blockNumber" integer,
    message text NOT NULL,
    signature text NOT NULL
);


--
-- Name: File; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."File" (
    id character varying(36) NOT NULL,
    path text NOT NULL,
    name text,
    filename text,
    mimetype text NOT NULL,
    encoding text NOT NULL,
    hash character varying(64),
    size numeric(65,30),
    "ImageResource" character varying(36),
    "createdById" character varying(36),
    rank integer,
    "Gallery" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content text,
    description text
);


--
-- Name: Incident; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Incident" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title character varying(500) NOT NULL,
    pattern text,
    "patternType" public."RedirectPatternType",
    status public."IncidentStatus" DEFAULT 'open'::public."IncidentStatus" NOT NULL,
    resolution text,
    "resolvedAt" timestamp(3) without time zone,
    "resolvedById" character varying(36)
);


--
-- Name: KBConcept; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBConcept" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type character varying(100),
    name character varying(500) NOT NULL,
    description text,
    content text,
    "createdById" character varying(36) NOT NULL,
    code character varying(100),
    data jsonb,
    "parentId" character varying(36),
    "rootId" character varying(36),
    image text,
    hash character varying(64),
    intro text,
    mimetype character varying(100),
    path character varying(1024),
    quality double precision DEFAULT 0.7 NOT NULL,
    size double precision,
    uri character varying(1024),
    visibility public."KBConceptVisibility" DEFAULT 'hidden'::public."KBConceptVisibility" NOT NULL,
    en jsonb
);


--
-- Name: KBConceptFile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBConceptFile" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "kBConceptId" character varying(36) NOT NULL,
    "fileId" character varying(36) NOT NULL,
    "createdById" character varying(36)
);


--
-- Name: KBConflict; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBConflict" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type character varying(100) NOT NULL,
    severity character varying(50) NOT NULL,
    status public."KBConflictStatus" DEFAULT 'open'::public."KBConflictStatus" NOT NULL,
    "createdById" character varying(36) NOT NULL,
    "constraintId" character varying(36)
);


--
-- Name: KBConflictFact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBConflictFact" (
    "conflictId" character varying(36) NOT NULL,
    "factId" character varying(36) NOT NULL
);


--
-- Name: KBConstraint; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBConstraint" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "constraint" text NOT NULL,
    scope jsonb,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: KBDecision; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBDecision" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subject character varying(500) NOT NULL,
    decision text NOT NULL,
    context jsonb,
    outcome jsonb,
    status public."KBDecisionStatus" DEFAULT 'still_valid'::public."KBDecisionStatus" NOT NULL,
    "revisedById" character varying(36),
    "basedOnProposalId" character varying(36),
    "createdById" character varying(36) NOT NULL
);


--
-- Name: KBFact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBFact" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdById" character varying(36) NOT NULL,
    type character varying(200) NOT NULL,
    statement text NOT NULL,
    "validFrom" date,
    "validTo" date,
    "knownSince" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    confidence double precision DEFAULT 0.5 NOT NULL,
    status public."KBFactStatus" DEFAULT 'unverified'::public."KBFactStatus" NOT NULL,
    source text,
    importance double precision DEFAULT 0.5 NOT NULL,
    "importanceBasis" jsonb,
    "factType" public."KBFactType" DEFAULT 'raw'::public."KBFactType" NOT NULL,
    "derivedFrom" jsonb
);


--
-- Name: KBFactParticipation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBFactParticipation" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "conceptId" character varying(36) NOT NULL,
    "factId" character varying(36) NOT NULL,
    role character varying(100) NOT NULL,
    impact character varying(50),
    value text,
    "localImportance" double precision DEFAULT 0.5 NOT NULL
);


--
-- Name: KBFactProjection; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBFactProjection" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "factId" character varying(36) NOT NULL,
    "knowledgeSpaceId" character varying(36) NOT NULL,
    visibility public."KBFactProjectionVisibility" DEFAULT 'visible'::public."KBFactProjectionVisibility" NOT NULL,
    "trustLevel" double precision DEFAULT 0.5 NOT NULL,
    importance double precision DEFAULT 0.5 NOT NULL,
    notes text,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: KBIdentityOperation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBIdentityOperation" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    operation public."KBIdentityOperationType" NOT NULL,
    rationale text,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: KBKnowledgeSpace; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBKnowledgeSpace" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."KBKnowledgeSpaceType" DEFAULT 'private'::public."KBKnowledgeSpaceType" NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: KBLabel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBLabel" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    text character varying(500) NOT NULL,
    language character varying(10),
    role public."KBLabelRole" DEFAULT 'primary'::public."KBLabelRole" NOT NULL,
    "conceptId" character varying(36) NOT NULL,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: KBProposal; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."KBProposal" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    statement text NOT NULL,
    status public."KBProposalStatus" DEFAULT 'untested'::public."KBProposalStatus" NOT NULL,
    "testedBy" character varying(36),
    "createdById" character varying(36) NOT NULL
);


--
-- Name: LearnStrategy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."LearnStrategy" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    description text,
    level smallint NOT NULL,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: LearnStrategyStage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."LearnStrategyStage" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "learnStrategyId" character varying(36) NOT NULL,
    "learnStrategyTargetId" character varying(36),
    "technologyId" character varying(36),
    level smallint
);


--
-- Name: Letter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Letter" (
    id character varying(36) NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    status public."LetterStatus" DEFAULT 'Created'::public."LetterStatus" NOT NULL,
    "errorMessage" text,
    rank integer,
    "deleteOnSend" boolean DEFAULT true NOT NULL,
    "replyTo" text,
    "returnTo" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "User" character varying(36)
);


--
-- Name: Log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Log" (
    id character varying(36) NOT NULL,
    level public."LogLevel" DEFAULT 'Info'::public."LogLevel" NOT NULL,
    "objectType" character varying(36),
    message text NOT NULL,
    stack text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: MentorMentee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MentorMentee" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."MentorMenteeStatus" NOT NULL,
    "mentorId" character varying(36) NOT NULL,
    "menteeId" character varying(36) NOT NULL
);


--
-- Name: MindLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MindLog" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."MindLogType" NOT NULL,
    data text NOT NULL,
    quality double precision,
    "createdById" character varying(36) NOT NULL,
    "relatedToUserId" character varying(36)
);


--
-- Name: NotificationType; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."NotificationType" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    code character varying(36),
    comment text,
    "CreatedBy" character varying(36)
);


--
-- Name: Offer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Offer" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title character varying(512) NOT NULL,
    description character varying(3072),
    intro text,
    content text,
    image character varying(1024),
    published boolean DEFAULT true NOT NULL,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: Position; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Position" (
    id character varying(36) NOT NULL,
    code character varying(36),
    name text NOT NULL,
    "CreatedBy" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    revision integer DEFAULT 1 NOT NULL,
    "createdById" character varying(36) NOT NULL,
    status public."PostStatus" DEFAULT 'draft'::public."PostStatus" NOT NULL,
    title character varying(512),
    description character varying(3072),
    intro text,
    content text NOT NULL,
    signature text,
    "parentId" character varying(36),
    "rootId" character varying(36),
    image text
);


--
-- Name: PostRevision; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PostRevision" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postId" character varying(36) NOT NULL,
    status public."PostStatus" NOT NULL,
    title character varying(512),
    description character varying(3072),
    intro text,
    content text NOT NULL,
    signature text,
    image text
);


--
-- Name: Project; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Project" (
    id character varying(36) NOT NULL,
    name text NOT NULL,
    domain text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    url text,
    content jsonb,
    "contentText" text,
    status public."ProjectStatus" DEFAULT 'New'::public."ProjectStatus",
    public boolean,
    "CreatedBy" character varying(36),
    "Image" character varying(36),
    "Team" character varying(36),
    "Resource" character varying(36),
    type public."ProjectType"
);


--
-- Name: ProjectMember; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProjectMember" (
    id character varying(36) NOT NULL,
    status public."ProjectMemberStatus" DEFAULT 'Active'::public."ProjectMemberStatus" NOT NULL,
    "User" character varying(36),
    "CreatedBy" character varying(36),
    "Project" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: ProjectTask; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProjectTask" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Project" character varying(36),
    "Task" character varying(36),
    "CreatedBy" character varying(36)
);


--
-- Name: RedirectRule; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RedirectRule" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(255) NOT NULL,
    pattern text NOT NULL,
    "patternType" public."RedirectPatternType" DEFAULT 'regex'::public."RedirectPatternType" NOT NULL,
    replacement text NOT NULL,
    "statusCode" integer DEFAULT 301 NOT NULL,
    priority integer DEFAULT 0 NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    comment text
);


--
-- Name: ResetPassword; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ResetPassword" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    code character varying(36) NOT NULL,
    password text NOT NULL,
    "validTill" timestamp(3) without time zone,
    "User" character varying(36) NOT NULL
);


--
-- Name: Resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Resource" (
    id character varying(36) NOT NULL,
    code character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."ResourceType" DEFAULT 'Resource'::public."ResourceType" NOT NULL,
    name text,
    longtitle text,
    content jsonb,
    "contentText" text,
    published boolean DEFAULT true NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    hidemenu boolean DEFAULT false NOT NULL,
    searchable boolean DEFAULT true NOT NULL,
    uri text NOT NULL,
    isfolder boolean NOT NULL,
    rating numeric(65,30),
    "positiveVotesCount" integer,
    "negativeVotesCount" integer,
    "neutralVotesCount" integer,
    "oldID" integer,
    "commentOldID" integer,
    class_key text,
    template integer,
    "mockUpdate" timestamp(3) without time zone,
    components jsonb,
    "Parent" character varying(36),
    "Team" character varying(36),
    "Service" character varying(36),
    "EthAccount" character varying(36),
    "PrismaProject" character varying(36),
    "CreatedBy" character varying(36),
    "Topic" character varying(36),
    "Blog" character varying(36),
    "Task" character varying(36),
    "contentV2" text,
    intro text,
    image text,
    "contentV3" text
);


--
-- Name: ResourceTag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ResourceTag" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status text NOT NULL,
    "CreatedBy" character varying(36),
    "Resource" character varying(36),
    "Tag" character varying(36)
);


--
-- Name: Service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Service" (
    id character varying(36) NOT NULL,
    name text,
    description text,
    code character varying(36),
    rank integer,
    "oldID" integer,
    "Category" character varying(36),
    "Parent" character varying(36),
    "CreatedBy" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: ServiceCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ServiceCategory" (
    id character varying(36) NOT NULL,
    name text NOT NULL,
    description text,
    code character varying(36),
    "Parent" character varying(36),
    "CreatedBy" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: SiteRoute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SiteRoute" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    path text NOT NULL,
    slug text NOT NULL,
    rank integer DEFAULT 0 NOT NULL,
    "parentId" text,
    "kBConceptId" text,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: SystemLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SystemLog" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    level public."SystemLogLevel" DEFAULT 'info'::public."SystemLogLevel" NOT NULL,
    source public."SystemLogSource" DEFAULT 'server'::public."SystemLogSource" NOT NULL,
    message text NOT NULL,
    stack text,
    url text,
    path character varying(2048),
    "statusCode" integer,
    method character varying(10),
    "userAgent" text,
    "robotType" character varying(50),
    ip character varying(45),
    referer text,
    headers jsonb,
    data jsonb,
    "redirectRuleId" character varying(36),
    "incidentId" character varying(36)
);


--
-- Name: Tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Tag" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    status public."TagStatus" DEFAULT 'Active'::public."TagStatus" NOT NULL,
    "CreatedBy" character varying(36)
);


--
-- Name: Task; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Task" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    content text,
    status public."TaskStatus" DEFAULT 'New'::public."TaskStatus" NOT NULL,
    "startDatePlaning" timestamp(3) without time zone,
    "endDatePlaning" timestamp(3) without time zone,
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "createdById" character varying(36) NOT NULL,
    "parentId" character varying(36),
    "ChatRoom" character varying(36),
    "needHelp" boolean,
    "projectId" character varying(36),
    title text NOT NULL,
    "assigneeId" character varying(36)
);


--
-- Name: TaskMember; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TaskMember" (
    id character varying(36) NOT NULL,
    status public."TaskMemberStatus" DEFAULT 'Active'::public."TaskMemberStatus" NOT NULL,
    "Task" character varying(36),
    "User" character varying(36),
    "CreatedBy" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: TaskReaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TaskReaction" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."TaskReactionType" NOT NULL,
    "Task" character varying(36),
    "CreatedBy" character varying(36) NOT NULL
);


--
-- Name: TaskTechnology; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TaskTechnology" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    level smallint,
    "Technology" character varying(36),
    "Task" character varying(36),
    "CreatedBy" character varying(36) NOT NULL
);


--
-- Name: TaskWorkLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TaskWorkLog" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content text NOT NULL,
    "taskId" character varying(36) NOT NULL,
    "createdById" character varying(36) NOT NULL
);


--
-- Name: Team; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Team" (
    id character varying(36) NOT NULL,
    name text NOT NULL,
    status public."TeamStatus" DEFAULT 'Active'::public."TeamStatus" NOT NULL,
    "oldID" integer,
    address text,
    website text,
    email text,
    phone text,
    "Parent" character varying(36),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "CreatedBy" character varying(36) NOT NULL,
    content text,
    description character varying(3072),
    image character varying(1024),
    intro text
);


--
-- Name: TeamMember; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TeamMember" (
    id character varying(36) NOT NULL,
    status public."TeamMemberStatus" DEFAULT 'Active'::public."TeamMemberStatus" NOT NULL,
    "User" character varying(36) NOT NULL,
    "Team" character varying(36),
    "CreatedBy" character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Technology; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Technology" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL,
    description text,
    components jsonb,
    "contentText" text,
    site_url text,
    level1hours integer,
    level2hours integer,
    level3hours integer,
    level4hours integer,
    level5hours integer,
    "CreatedBy" character varying(36) NOT NULL
);


--
-- Name: TechnologyLesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TechnologyLesson" (
    id character varying(36) NOT NULL,
    name text,
    components jsonb,
    "contentText" text,
    "CreatedBy" character varying(36) NOT NULL,
    "Technology" character varying(36) NOT NULL
);


--
-- Name: TechnologyLessonUser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TechnologyLessonUser" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."TechnologyLessonUserStatus" DEFAULT 'Accepted'::public."TechnologyLessonUserStatus" NOT NULL,
    "completedAt" timestamp(3) without time zone,
    "CreatedBy" character varying(36) NOT NULL,
    "Lesson" character varying(36) NOT NULL
);


--
-- Name: TelegramAccount; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TelegramAccount" (
    id character varying(36) NOT NULL,
    "createdAt" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "externalKey" text NOT NULL,
    first_name text,
    last_name text,
    username text,
    photo_url text,
    auth_date timestamp(0) without time zone,
    "userId" character varying(36) NOT NULL
);


--
-- Name: Timer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Timer" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "stopedAt" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Task" character varying(36),
    "CreatedBy" character varying(36),
    content text
);


--
-- Name: Token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Token" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "expiredAt" timestamp(3) without time zone,
    "userId" character varying(36)
);


--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Transaction" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" character varying(36) NOT NULL,
    type public."TransactionType" NOT NULL,
    amount double precision NOT NULL,
    title text,
    "parentId" character varying(36),
    "balanceId" character varying(36) NOT NULL,
    "ethTransactionId" character varying(36)
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username text,
    email text,
    phone text,
    "showEmail" boolean DEFAULT false NOT NULL,
    "showPhone" boolean DEFAULT false NOT NULL,
    "showFullname" boolean DEFAULT true NOT NULL,
    password character varying(72),
    fullname text,
    image text,
    address text,
    active boolean,
    blocked boolean DEFAULT false NOT NULL,
    activated boolean,
    deleted boolean,
    hidden boolean,
    sudo boolean DEFAULT false,
    "CreatedBy" character varying(36),
    "EthAccountAuthed" character varying(36),
    "isMentor" boolean DEFAULT false NOT NULL,
    "technologyLevel" smallint,
    telegram text,
    type public."userType" DEFAULT 'Human'::public."userType" NOT NULL,
    data jsonb,
    intro text,
    content text,
    rating integer DEFAULT 0 NOT NULL,
    "referrerId" character varying(36),
    status public."UserStatus" DEFAULT 'active'::public."UserStatus" NOT NULL,
    "isAiAgent" boolean DEFAULT false NOT NULL,
    en jsonb
);


--
-- Name: UserLearnStrategy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserLearnStrategy" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdById" character varying(36) NOT NULL,
    "learnStrategyId" character varying(36) NOT NULL
);


--
-- Name: UserTechnology; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserTechnology" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    components jsonb,
    date_from timestamp(3) without time zone,
    date_till timestamp(3) without time zone,
    status public."UserTechnologyStatus",
    hiring_status public."UserTechnologyHiringStatus",
    "isMentor" boolean DEFAULT false NOT NULL,
    "CreatedBy" character varying(36) NOT NULL,
    "Technology" character varying(36) NOT NULL,
    level smallint,
    rating integer DEFAULT 0 NOT NULL
);


--
-- Name: Vote; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Vote" (
    id character varying(36) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    value numeric(65,30) NOT NULL,
    "Resource" character varying(36),
    "User" character varying(36) NOT NULL
);


--
-- Name: _IdentityInput; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_IdentityInput" (
    "A" character varying(36) NOT NULL,
    "B" character varying(36) NOT NULL
);


--
-- Name: _IdentityOutput; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_IdentityOutput" (
    "A" character varying(36) NOT NULL,
    "B" character varying(36) NOT NULL
);


--
-- Name: _PositionUsers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_PositionUsers" (
    "A" character varying(36) NOT NULL,
    "B" character varying(36) NOT NULL
);


--
-- Name: _PrismaProjectUsers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_PrismaProjectUsers" (
    "A" character varying(36) NOT NULL,
    "B" character varying(36) NOT NULL
);


--
-- Name: _ProjectCustomers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_ProjectCustomers" (
    "A" character varying(36) NOT NULL,
    "B" character varying(36) NOT NULL
);


--
-- Name: _ProjectMemberServices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_ProjectMemberServices" (
    "A" character varying(36) NOT NULL,
    "B" character varying(36) NOT NULL
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
-- Name: Balance Balance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Balance"
    ADD CONSTRAINT "Balance_pkey" PRIMARY KEY (id);


--
-- Name: Career Career_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Career"
    ADD CONSTRAINT "Career_pkey" PRIMARY KEY (id);


--
-- Name: ChatMessageOld ChatMessageOld_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ChatMessageOld"
    ADD CONSTRAINT "ChatMessageOld_pkey" PRIMARY KEY (id);


--
-- Name: ChatMessage ChatMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ChatMessage"
    ADD CONSTRAINT "ChatMessage_pkey" PRIMARY KEY (id);


--
-- Name: ChatRoom ChatRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ChatRoom"
    ADD CONSTRAINT "ChatRoom_pkey" PRIMARY KEY (id);


--
-- Name: CodeChallengeBlock CodeChallengeBlock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeBlock"
    ADD CONSTRAINT "CodeChallengeBlock_pkey" PRIMARY KEY (id);


--
-- Name: CodeChallengeCompletion CodeChallengeCompletion_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeCompletion"
    ADD CONSTRAINT "CodeChallengeCompletion_pkey" PRIMARY KEY (id);


--
-- Name: CodeChallenge CodeChallenge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallenge"
    ADD CONSTRAINT "CodeChallenge_pkey" PRIMARY KEY (id);


--
-- Name: EXReaction EXReaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EXReaction"
    ADD CONSTRAINT "EXReaction_pkey" PRIMARY KEY (id);


--
-- Name: EXReflex EXReflex_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EXReflex"
    ADD CONSTRAINT "EXReflex_pkey" PRIMARY KEY (id);


--
-- Name: EthAccount EthAccount_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EthAccount"
    ADD CONSTRAINT "EthAccount_pkey" PRIMARY KEY (id);


--
-- Name: EthTransaction EthTransaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EthTransaction"
    ADD CONSTRAINT "EthTransaction_pkey" PRIMARY KEY (id);


--
-- Name: File File_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY (id);


--
-- Name: Incident Incident_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_pkey" PRIMARY KEY (id);


--
-- Name: KBConceptFile KBConceptFile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConceptFile"
    ADD CONSTRAINT "KBConceptFile_pkey" PRIMARY KEY (id);


--
-- Name: KBConcept KBConcept_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConcept"
    ADD CONSTRAINT "KBConcept_pkey" PRIMARY KEY (id);


--
-- Name: KBConflictFact KBConflictFact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConflictFact"
    ADD CONSTRAINT "KBConflictFact_pkey" PRIMARY KEY ("conflictId", "factId");


--
-- Name: KBConflict KBConflict_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConflict"
    ADD CONSTRAINT "KBConflict_pkey" PRIMARY KEY (id);


--
-- Name: KBConstraint KBConstraint_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConstraint"
    ADD CONSTRAINT "KBConstraint_pkey" PRIMARY KEY (id);


--
-- Name: KBDecision KBDecision_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBDecision"
    ADD CONSTRAINT "KBDecision_pkey" PRIMARY KEY (id);


--
-- Name: KBFactParticipation KBFactParticipation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactParticipation"
    ADD CONSTRAINT "KBFactParticipation_pkey" PRIMARY KEY (id);


--
-- Name: KBFactProjection KBFactProjection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactProjection"
    ADD CONSTRAINT "KBFactProjection_pkey" PRIMARY KEY (id);


--
-- Name: KBFact KBFact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFact"
    ADD CONSTRAINT "KBFact_pkey" PRIMARY KEY (id);


--
-- Name: KBIdentityOperation KBIdentityOperation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBIdentityOperation"
    ADD CONSTRAINT "KBIdentityOperation_pkey" PRIMARY KEY (id);


--
-- Name: KBKnowledgeSpace KBKnowledgeSpace_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBKnowledgeSpace"
    ADD CONSTRAINT "KBKnowledgeSpace_pkey" PRIMARY KEY (id);


--
-- Name: KBLabel KBLabel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBLabel"
    ADD CONSTRAINT "KBLabel_pkey" PRIMARY KEY (id);


--
-- Name: KBProposal KBProposal_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBProposal"
    ADD CONSTRAINT "KBProposal_pkey" PRIMARY KEY (id);


--
-- Name: LearnStrategyStage LearnStrategyStage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LearnStrategyStage"
    ADD CONSTRAINT "LearnStrategyStage_pkey" PRIMARY KEY (id);


--
-- Name: LearnStrategy LearnStrategy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LearnStrategy"
    ADD CONSTRAINT "LearnStrategy_pkey" PRIMARY KEY (id);


--
-- Name: Letter Letter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Letter"
    ADD CONSTRAINT "Letter_pkey" PRIMARY KEY (id);


--
-- Name: Log Log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_pkey" PRIMARY KEY (id);


--
-- Name: MentorMentee MentorMentee_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MentorMentee"
    ADD CONSTRAINT "MentorMentee_pkey" PRIMARY KEY (id);


--
-- Name: MindLog MindLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MindLog"
    ADD CONSTRAINT "MindLog_pkey" PRIMARY KEY (id);


--
-- Name: NotificationType NotificationType_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NotificationType"
    ADD CONSTRAINT "NotificationType_pkey" PRIMARY KEY (id);


--
-- Name: Offer Offer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY (id);


--
-- Name: Position Position_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "Position_pkey" PRIMARY KEY (id);


--
-- Name: PostRevision PostRevision_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostRevision"
    ADD CONSTRAINT "PostRevision_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: ProjectMember ProjectMember_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectMember"
    ADD CONSTRAINT "ProjectMember_pkey" PRIMARY KEY (id);


--
-- Name: ProjectTask ProjectTask_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: RedirectRule RedirectRule_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RedirectRule"
    ADD CONSTRAINT "RedirectRule_pkey" PRIMARY KEY (id);


--
-- Name: ResetPassword ResetPassword_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResetPassword"
    ADD CONSTRAINT "ResetPassword_pkey" PRIMARY KEY (id);


--
-- Name: ResourceTag ResourceTag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceTag"
    ADD CONSTRAINT "ResourceTag_pkey" PRIMARY KEY (id);


--
-- Name: Resource Resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);


--
-- Name: ServiceCategory ServiceCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ServiceCategory"
    ADD CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: SiteRoute SiteRoute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteRoute"
    ADD CONSTRAINT "SiteRoute_pkey" PRIMARY KEY (id);


--
-- Name: SystemLog SystemLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SystemLog"
    ADD CONSTRAINT "SystemLog_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: TaskMember TaskMember_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskMember"
    ADD CONSTRAINT "TaskMember_pkey" PRIMARY KEY (id);


--
-- Name: TaskReaction TaskReaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskReaction"
    ADD CONSTRAINT "TaskReaction_pkey" PRIMARY KEY (id);


--
-- Name: TaskTechnology TaskTechnology_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskTechnology"
    ADD CONSTRAINT "TaskTechnology_pkey" PRIMARY KEY (id);


--
-- Name: TaskWorkLog TaskWorkLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskWorkLog"
    ADD CONSTRAINT "TaskWorkLog_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: TeamMember TeamMember_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY (id);


--
-- Name: Team Team_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_pkey" PRIMARY KEY (id);


--
-- Name: TechnologyLessonUser TechnologyLessonUser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TechnologyLessonUser"
    ADD CONSTRAINT "TechnologyLessonUser_pkey" PRIMARY KEY (id);


--
-- Name: TechnologyLesson TechnologyLesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TechnologyLesson"
    ADD CONSTRAINT "TechnologyLesson_pkey" PRIMARY KEY (id);


--
-- Name: Technology Technology_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Technology"
    ADD CONSTRAINT "Technology_pkey" PRIMARY KEY (id);


--
-- Name: TelegramAccount TelegramAccount_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TelegramAccount"
    ADD CONSTRAINT "TelegramAccount_pkey" PRIMARY KEY (id);


--
-- Name: Timer Timer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Timer"
    ADD CONSTRAINT "Timer_pkey" PRIMARY KEY (id);


--
-- Name: Token Token_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "Token_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: UserLearnStrategy UserLearnStrategy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserLearnStrategy"
    ADD CONSTRAINT "UserLearnStrategy_pkey" PRIMARY KEY (id);


--
-- Name: UserTechnology UserTechnology_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserTechnology"
    ADD CONSTRAINT "UserTechnology_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vote Vote_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);


--
-- Name: _IdentityInput _IdentityInput_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_IdentityInput"
    ADD CONSTRAINT "_IdentityInput_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _IdentityOutput _IdentityOutput_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_IdentityOutput"
    ADD CONSTRAINT "_IdentityOutput_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _PositionUsers _PositionUsers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_PositionUsers"
    ADD CONSTRAINT "_PositionUsers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _PrismaProjectUsers _PrismaProjectUsers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_PrismaProjectUsers"
    ADD CONSTRAINT "_PrismaProjectUsers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _ProjectCustomers _ProjectCustomers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ProjectCustomers"
    ADD CONSTRAINT "_ProjectCustomers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _ProjectMemberServices _ProjectMemberServices_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ProjectMemberServices"
    ADD CONSTRAINT "_ProjectMemberServices_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Balance_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Balance_userId_key" ON public."Balance" USING btree ("userId");


--
-- Name: Career_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Career_CreatedBy" ON public."Career" USING btree ("CreatedBy");


--
-- Name: ChatMessageOld_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ChatMessageOld_CreatedBy" ON public."ChatMessageOld" USING btree ("CreatedBy");


--
-- Name: ChatMessageOld_Room; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ChatMessageOld_Room" ON public."ChatMessageOld" USING btree ("Room");


--
-- Name: ChatRoom_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ChatRoom_CreatedBy" ON public."ChatRoom" USING btree ("CreatedBy");


--
-- Name: ChatRoom_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ChatRoom_code_key" ON public."ChatRoom" USING btree (code);


--
-- Name: CodeChallengeBlock_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallengeBlock_CreatedBy" ON public."CodeChallengeBlock" USING btree ("CreatedBy");


--
-- Name: CodeChallengeBlock_Parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallengeBlock_Parent" ON public."CodeChallengeBlock" USING btree ("Parent");


--
-- Name: CodeChallengeCompletion_CodeChallenge; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallengeCompletion_CodeChallenge" ON public."CodeChallengeCompletion" USING btree ("CodeChallenge");


--
-- Name: CodeChallengeCompletion_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallengeCompletion_CreatedBy" ON public."CodeChallengeCompletion" USING btree ("CreatedBy");


--
-- Name: CodeChallengeCompletion_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallengeCompletion_Task" ON public."CodeChallengeCompletion" USING btree ("Task");


--
-- Name: CodeChallenge_Block; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallenge_Block" ON public."CodeChallenge" USING btree ("Block");


--
-- Name: CodeChallenge_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallenge_CreatedBy" ON public."CodeChallenge" USING btree ("CreatedBy");


--
-- Name: CodeChallenge_Topic; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "CodeChallenge_Topic" ON public."CodeChallenge" USING btree ("Topic");


--
-- Name: CodeChallenge_externalKey_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CodeChallenge_externalKey_key" ON public."CodeChallenge" USING btree ("externalKey");


--
-- Name: EXReaction_createdById_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EXReaction_createdById_idx" ON public."EXReaction" USING btree ("createdById");


--
-- Name: EXReaction_reflexId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EXReaction_reflexId_idx" ON public."EXReaction" USING btree ("reflexId");


--
-- Name: EXReaction_relatedToUserId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EXReaction_relatedToUserId_idx" ON public."EXReaction" USING btree ("relatedToUserId");


--
-- Name: EXReflex_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EXReflex_status_idx" ON public."EXReflex" USING btree (status);


--
-- Name: EXReflex_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "EXReflex_type_idx" ON public."EXReflex" USING btree (type);


--
-- Name: EthAccount_address_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "EthAccount_address_key" ON public."EthAccount" USING btree (address);


--
-- Name: EthAccount_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "EthAccount_userId_key" ON public."EthAccount" USING btree ("userId");


--
-- Name: EthTransaction_chainId_txHash_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "EthTransaction_chainId_txHash_key" ON public."EthTransaction" USING btree ("chainId", "txHash");


--
-- Name: File_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "File_CreatedBy" ON public."File" USING btree ("createdById");


--
-- Name: File_Gallery; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "File_Gallery" ON public."File" USING btree ("Gallery");


--
-- Name: File_ImageResource; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "File_ImageResource" ON public."File" USING btree ("ImageResource");


--
-- Name: File_hash_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "File_hash_key" ON public."File" USING btree (hash);


--
-- Name: File_path_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "File_path_key" ON public."File" USING btree (path);


--
-- Name: Incident_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Incident_createdAt_idx" ON public."Incident" USING btree ("createdAt");


--
-- Name: Incident_resolvedById_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Incident_resolvedById_idx" ON public."Incident" USING btree ("resolvedById");


--
-- Name: Incident_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Incident_status_idx" ON public."Incident" USING btree (status);


--
-- Name: KBConceptFile_createdById_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConceptFile_createdById_idx" ON public."KBConceptFile" USING btree ("createdById");


--
-- Name: KBConceptFile_kBConceptId_fileId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBConceptFile_kBConceptId_fileId_key" ON public."KBConceptFile" USING btree ("kBConceptId", "fileId");


--
-- Name: KBConcept_code_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConcept_code_idx" ON public."KBConcept" USING btree (code);


--
-- Name: KBConcept_hash_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBConcept_hash_key" ON public."KBConcept" USING btree (hash);


--
-- Name: KBConcept_parentId_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBConcept_parentId_code_key" ON public."KBConcept" USING btree ("parentId", code);


--
-- Name: KBConcept_parentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConcept_parentId_idx" ON public."KBConcept" USING btree ("parentId");


--
-- Name: KBConcept_path_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBConcept_path_key" ON public."KBConcept" USING btree (path);


--
-- Name: KBConcept_quality_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConcept_quality_idx" ON public."KBConcept" USING btree (quality);


--
-- Name: KBConcept_rootId_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBConcept_rootId_code_key" ON public."KBConcept" USING btree ("rootId", code);


--
-- Name: KBConcept_rootId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConcept_rootId_idx" ON public."KBConcept" USING btree ("rootId");


--
-- Name: KBConcept_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConcept_type_idx" ON public."KBConcept" USING btree (type);


--
-- Name: KBConcept_uri_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBConcept_uri_key" ON public."KBConcept" USING btree (uri);


--
-- Name: KBConcept_visibility_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBConcept_visibility_idx" ON public."KBConcept" USING btree (visibility);


--
-- Name: KBFactParticipation_conceptId_factId_role_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBFactParticipation_conceptId_factId_role_key" ON public."KBFactParticipation" USING btree ("conceptId", "factId", role);


--
-- Name: KBFactParticipation_conceptId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBFactParticipation_conceptId_idx" ON public."KBFactParticipation" USING btree ("conceptId");


--
-- Name: KBFactParticipation_factId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBFactParticipation_factId_idx" ON public."KBFactParticipation" USING btree ("factId");


--
-- Name: KBFactParticipation_role_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBFactParticipation_role_idx" ON public."KBFactParticipation" USING btree (role);


--
-- Name: KBFactProjection_factId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBFactProjection_factId_idx" ON public."KBFactProjection" USING btree ("factId");


--
-- Name: KBFactProjection_factId_knowledgeSpaceId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "KBFactProjection_factId_knowledgeSpaceId_key" ON public."KBFactProjection" USING btree ("factId", "knowledgeSpaceId");


--
-- Name: KBFactProjection_knowledgeSpaceId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBFactProjection_knowledgeSpaceId_idx" ON public."KBFactProjection" USING btree ("knowledgeSpaceId");


--
-- Name: KBFact_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBFact_type_idx" ON public."KBFact" USING btree (type);


--
-- Name: KBLabel_conceptId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "KBLabel_conceptId_idx" ON public."KBLabel" USING btree ("conceptId");


--
-- Name: Letter_User; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Letter_User" ON public."Letter" USING btree ("User");


--
-- Name: MindLog_relatedToUserId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "MindLog_relatedToUserId_idx" ON public."MindLog" USING btree ("relatedToUserId");


--
-- Name: MindLog_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "MindLog_type_idx" ON public."MindLog" USING btree (type);


--
-- Name: NotificationType_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "NotificationType_CreatedBy" ON public."NotificationType" USING btree ("CreatedBy");


--
-- Name: NotificationType_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "NotificationType_code_key" ON public."NotificationType" USING btree (code);


--
-- Name: Offer_createdById_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Offer_createdById_idx" ON public."Offer" USING btree ("createdById");


--
-- Name: Position_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Position_CreatedBy" ON public."Position" USING btree ("CreatedBy");


--
-- Name: Position_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Position_code_key" ON public."Position" USING btree (code);


--
-- Name: PostRevision_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PostRevision_createdAt_idx" ON public."PostRevision" USING btree ("createdAt");


--
-- Name: PostRevision_postId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "PostRevision_postId_idx" ON public."PostRevision" USING btree ("postId");


--
-- Name: Post_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Post_createdAt_idx" ON public."Post" USING btree ("createdAt");


--
-- Name: Post_createdById_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Post_createdById_idx" ON public."Post" USING btree ("createdById");


--
-- Name: Post_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Post_status_idx" ON public."Post" USING btree (status);


--
-- Name: ProjectMember_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ProjectMember_CreatedBy" ON public."ProjectMember" USING btree ("CreatedBy");


--
-- Name: ProjectMember_Project; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ProjectMember_Project" ON public."ProjectMember" USING btree ("Project");


--
-- Name: ProjectMember_User; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ProjectMember_User" ON public."ProjectMember" USING btree ("User");


--
-- Name: ProjectTask_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ProjectTask_CreatedBy" ON public."ProjectTask" USING btree ("CreatedBy");


--
-- Name: ProjectTask_Project; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ProjectTask_Project" ON public."ProjectTask" USING btree ("Project");


--
-- Name: ProjectTask_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ProjectTask_Task" ON public."ProjectTask" USING btree ("Task");


--
-- Name: Project_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Project_CreatedBy" ON public."Project" USING btree ("CreatedBy");


--
-- Name: Project_Image; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Project_Image" ON public."Project" USING btree ("Image");


--
-- Name: Project_Resource; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Project_Resource" ON public."Project" USING btree ("Resource");


--
-- Name: Project_Team; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Project_Team" ON public."Project" USING btree ("Team");


--
-- Name: RedirectRule_enabled_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RedirectRule_enabled_idx" ON public."RedirectRule" USING btree (enabled);


--
-- Name: RedirectRule_pattern_patternType_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "RedirectRule_pattern_patternType_key" ON public."RedirectRule" USING btree (pattern, "patternType");


--
-- Name: RedirectRule_priority_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RedirectRule_priority_idx" ON public."RedirectRule" USING btree (priority);


--
-- Name: ResetPassword_User; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ResetPassword_User" ON public."ResetPassword" USING btree ("User");


--
-- Name: ResourceTag_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ResourceTag_CreatedBy" ON public."ResourceTag" USING btree ("CreatedBy");


--
-- Name: ResourceTag_Resource; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ResourceTag_Resource" ON public."ResourceTag" USING btree ("Resource");


--
-- Name: ResourceTag_Tag; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ResourceTag_Tag" ON public."ResourceTag" USING btree ("Tag");


--
-- Name: Resource_Blog; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_Blog" ON public."Resource" USING btree ("Blog");


--
-- Name: Resource_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_CreatedBy" ON public."Resource" USING btree ("CreatedBy");


--
-- Name: Resource_EthAccount; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_EthAccount" ON public."Resource" USING btree ("EthAccount");


--
-- Name: Resource_Parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_Parent" ON public."Resource" USING btree ("Parent");


--
-- Name: Resource_PrismaProject; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_PrismaProject" ON public."Resource" USING btree ("PrismaProject");


--
-- Name: Resource_Service; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_Service" ON public."Resource" USING btree ("Service");


--
-- Name: Resource_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_Task" ON public."Resource" USING btree ("Task");


--
-- Name: Resource_Team; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_Team" ON public."Resource" USING btree ("Team");


--
-- Name: Resource_Topic; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Resource_Topic" ON public."Resource" USING btree ("Topic");


--
-- Name: Resource_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Resource_code_key" ON public."Resource" USING btree (code);


--
-- Name: Resource_commentOldID_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Resource_commentOldID_key" ON public."Resource" USING btree ("commentOldID");


--
-- Name: Resource_oldID_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Resource_oldID_key" ON public."Resource" USING btree ("oldID");


--
-- Name: Resource_uri_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Resource_uri_key" ON public."Resource" USING btree (uri);


--
-- Name: ServiceCategory_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ServiceCategory_CreatedBy" ON public."ServiceCategory" USING btree ("CreatedBy");


--
-- Name: ServiceCategory_Parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ServiceCategory_Parent" ON public."ServiceCategory" USING btree ("Parent");


--
-- Name: ServiceCategory_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ServiceCategory_code_key" ON public."ServiceCategory" USING btree (code);


--
-- Name: Service_Category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Service_Category" ON public."Service" USING btree ("Category");


--
-- Name: Service_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Service_CreatedBy" ON public."Service" USING btree ("CreatedBy");


--
-- Name: Service_Parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Service_Parent" ON public."Service" USING btree ("Parent");


--
-- Name: Service_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Service_code_key" ON public."Service" USING btree (code);


--
-- Name: Service_oldID_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Service_oldID_key" ON public."Service" USING btree ("oldID");


--
-- Name: SiteRoute_createdById_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SiteRoute_createdById_idx" ON public."SiteRoute" USING btree ("createdById");


--
-- Name: SiteRoute_kBConceptId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SiteRoute_kBConceptId_key" ON public."SiteRoute" USING btree ("kBConceptId");


--
-- Name: SiteRoute_parentId_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SiteRoute_parentId_slug_key" ON public."SiteRoute" USING btree ("parentId", slug);


--
-- Name: SiteRoute_path_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SiteRoute_path_key" ON public."SiteRoute" USING btree (path);


--
-- Name: SystemLog_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_createdAt_idx" ON public."SystemLog" USING btree ("createdAt");


--
-- Name: SystemLog_incidentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_incidentId_idx" ON public."SystemLog" USING btree ("incidentId");


--
-- Name: SystemLog_level_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_level_idx" ON public."SystemLog" USING btree (level);


--
-- Name: SystemLog_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_path_idx" ON public."SystemLog" USING btree (path);


--
-- Name: SystemLog_redirectRuleId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_redirectRuleId_idx" ON public."SystemLog" USING btree ("redirectRuleId");


--
-- Name: SystemLog_robotType_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_robotType_idx" ON public."SystemLog" USING btree ("robotType");


--
-- Name: SystemLog_source_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_source_idx" ON public."SystemLog" USING btree (source);


--
-- Name: SystemLog_statusCode_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SystemLog_statusCode_idx" ON public."SystemLog" USING btree ("statusCode");


--
-- Name: Tag_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Tag_CreatedBy" ON public."Tag" USING btree ("CreatedBy");


--
-- Name: Tag_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);


--
-- Name: TaskMember_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskMember_CreatedBy" ON public."TaskMember" USING btree ("CreatedBy");


--
-- Name: TaskMember_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskMember_Task" ON public."TaskMember" USING btree ("Task");


--
-- Name: TaskMember_User; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskMember_User" ON public."TaskMember" USING btree ("User");


--
-- Name: TaskReaction_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskReaction_CreatedBy" ON public."TaskReaction" USING btree ("CreatedBy");


--
-- Name: TaskReaction_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskReaction_Task" ON public."TaskReaction" USING btree ("Task");


--
-- Name: TaskTechnology_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskTechnology_CreatedBy" ON public."TaskTechnology" USING btree ("CreatedBy");


--
-- Name: TaskTechnology_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskTechnology_Task" ON public."TaskTechnology" USING btree ("Task");


--
-- Name: TaskTechnology_Technology; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TaskTechnology_Technology" ON public."TaskTechnology" USING btree ("Technology");


--
-- Name: Task_ChatRoom; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Task_ChatRoom" ON public."Task" USING btree ("ChatRoom");


--
-- Name: Task_createdById; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Task_createdById" ON public."Task" USING btree ("createdById");


--
-- Name: Task_parentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Task_parentId" ON public."Task" USING btree ("parentId");


--
-- Name: TeamMember_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TeamMember_CreatedBy" ON public."TeamMember" USING btree ("CreatedBy");


--
-- Name: TeamMember_Team; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TeamMember_Team" ON public."TeamMember" USING btree ("Team");


--
-- Name: TeamMember_Team_User_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "TeamMember_Team_User_key" ON public."TeamMember" USING btree ("Team", "User");


--
-- Name: TeamMember_User; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TeamMember_User" ON public."TeamMember" USING btree ("User");


--
-- Name: Team_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Team_CreatedBy" ON public."Team" USING btree ("CreatedBy");


--
-- Name: Team_Parent; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Team_Parent" ON public."Team" USING btree ("Parent");


--
-- Name: Team_oldID_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Team_oldID_key" ON public."Team" USING btree ("oldID");


--
-- Name: TechnologyLessonUser_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TechnologyLessonUser_CreatedBy" ON public."TechnologyLessonUser" USING btree ("CreatedBy");


--
-- Name: TechnologyLessonUser_Lesson; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TechnologyLessonUser_Lesson" ON public."TechnologyLessonUser" USING btree ("Lesson");


--
-- Name: TechnologyLesson_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TechnologyLesson_CreatedBy" ON public."TechnologyLesson" USING btree ("CreatedBy");


--
-- Name: TechnologyLesson_Technology; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "TechnologyLesson_Technology" ON public."TechnologyLesson" USING btree ("Technology");


--
-- Name: Technology_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Technology_CreatedBy" ON public."Technology" USING btree ("CreatedBy");


--
-- Name: Technology_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Technology_name_key" ON public."Technology" USING btree (name);


--
-- Name: TelegramAccount_externalKey_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "TelegramAccount_externalKey_key" ON public."TelegramAccount" USING btree ("externalKey");


--
-- Name: TelegramAccount_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "TelegramAccount_userId_key" ON public."TelegramAccount" USING btree ("userId");


--
-- Name: Timer_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Timer_CreatedBy" ON public."Timer" USING btree ("CreatedBy");


--
-- Name: Timer_Task; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Timer_Task" ON public."Timer" USING btree ("Task");


--
-- Name: Token_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Token_createdAt_idx" ON public."Token" USING btree ("createdAt");


--
-- Name: Transaction_ethTransactionId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Transaction_ethTransactionId_key" ON public."Transaction" USING btree ("ethTransactionId");


--
-- Name: UserTechnology_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UserTechnology_CreatedBy" ON public."UserTechnology" USING btree ("CreatedBy");


--
-- Name: UserTechnology_Technology; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UserTechnology_Technology" ON public."UserTechnology" USING btree ("Technology");


--
-- Name: User_CreatedBy; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_CreatedBy" ON public."User" USING btree ("CreatedBy");


--
-- Name: User_EthAccountAuthed; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_EthAccountAuthed" ON public."User" USING btree ("EthAccountAuthed");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Vote_Resource; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Vote_Resource" ON public."Vote" USING btree ("Resource");


--
-- Name: Vote_User; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Vote_User" ON public."Vote" USING btree ("User");


--
-- Name: _IdentityInput_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_IdentityInput_B_index" ON public."_IdentityInput" USING btree ("B");


--
-- Name: _IdentityOutput_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_IdentityOutput_B_index" ON public."_IdentityOutput" USING btree ("B");


--
-- Name: _PositionUsers_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_PositionUsers_B_index" ON public."_PositionUsers" USING btree ("B");


--
-- Name: _PrismaProjectUsers_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_PrismaProjectUsers_B_index" ON public."_PrismaProjectUsers" USING btree ("B");


--
-- Name: _ProjectCustomers_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_ProjectCustomers_B_index" ON public."_ProjectCustomers" USING btree ("B");


--
-- Name: _ProjectMemberServices_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_ProjectMemberServices_B_index" ON public."_ProjectMemberServices" USING btree ("B");


--
-- Name: lss_strategy_target_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX lss_strategy_target_uniq ON public."LearnStrategyStage" USING btree ("learnStrategyId", "learnStrategyTargetId");


--
-- Name: lss_strategy_tech_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX lss_strategy_tech_uniq ON public."LearnStrategyStage" USING btree ("learnStrategyId", "technologyId");


--
-- Name: mm_mentor_mentee_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX mm_mentor_mentee_uniq ON public."MentorMentee" USING btree ("mentorId", "menteeId");


--
-- Name: tt_task_tech_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tt_task_tech_uniq ON public."TaskTechnology" USING btree ("Task", "Technology");


--
-- Name: uls_user_strategy_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uls_user_strategy_uniq ON public."UserLearnStrategy" USING btree ("createdById", "learnStrategyId");


--
-- Name: ut_user_tech_uniq; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ut_user_tech_uniq ON public."UserTechnology" USING btree ("CreatedBy", "Technology");


--
-- Name: Balance Balance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Balance"
    ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Career Career_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Career"
    ADD CONSTRAINT "Career_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ChatMessageOld ChatMessageOld_Room_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ChatMessageOld"
    ADD CONSTRAINT "ChatMessageOld_Room_fkey" FOREIGN KEY ("Room") REFERENCES public."ChatRoom"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ChatMessage ChatMessage_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ChatMessage"
    ADD CONSTRAINT "ChatMessage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ChatMessage ChatMessage_toUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ChatMessage"
    ADD CONSTRAINT "ChatMessage_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CodeChallengeBlock CodeChallengeBlock_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeBlock"
    ADD CONSTRAINT "CodeChallengeBlock_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallengeBlock CodeChallengeBlock_Parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeBlock"
    ADD CONSTRAINT "CodeChallengeBlock_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES public."CodeChallengeBlock"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallengeCompletion CodeChallengeCompletion_CodeChallenge_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeCompletion"
    ADD CONSTRAINT "CodeChallengeCompletion_CodeChallenge_fkey" FOREIGN KEY ("CodeChallenge") REFERENCES public."CodeChallenge"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallengeCompletion CodeChallengeCompletion_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeCompletion"
    ADD CONSTRAINT "CodeChallengeCompletion_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallengeCompletion CodeChallengeCompletion_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallengeCompletion"
    ADD CONSTRAINT "CodeChallengeCompletion_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallenge CodeChallenge_Block_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallenge"
    ADD CONSTRAINT "CodeChallenge_Block_fkey" FOREIGN KEY ("Block") REFERENCES public."CodeChallengeBlock"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallenge CodeChallenge_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallenge"
    ADD CONSTRAINT "CodeChallenge_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CodeChallenge CodeChallenge_Topic_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CodeChallenge"
    ADD CONSTRAINT "CodeChallenge_Topic_fkey" FOREIGN KEY ("Topic") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EXReaction EXReaction_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EXReaction"
    ADD CONSTRAINT "EXReaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EXReaction EXReaction_reflexId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EXReaction"
    ADD CONSTRAINT "EXReaction_reflexId_fkey" FOREIGN KEY ("reflexId") REFERENCES public."EXReflex"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EXReflex EXReflex_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EXReflex"
    ADD CONSTRAINT "EXReflex_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EthAccount EthAccount_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EthAccount"
    ADD CONSTRAINT "EthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EthTransaction EthTransaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EthTransaction"
    ADD CONSTRAINT "EthTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: File File_ImageResource_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_ImageResource_fkey" FOREIGN KEY ("ImageResource") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: File File_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Incident Incident_resolvedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: KBConceptFile KBConceptFile_fileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConceptFile"
    ADD CONSTRAINT "KBConceptFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES public."File"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: KBConceptFile KBConceptFile_kBConceptId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConceptFile"
    ADD CONSTRAINT "KBConceptFile_kBConceptId_fkey" FOREIGN KEY ("kBConceptId") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: KBConcept KBConcept_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConcept"
    ADD CONSTRAINT "KBConcept_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBConcept KBConcept_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConcept"
    ADD CONSTRAINT "KBConcept_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: KBConcept KBConcept_rootId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConcept"
    ADD CONSTRAINT "KBConcept_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: KBConflictFact KBConflictFact_conflictId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConflictFact"
    ADD CONSTRAINT "KBConflictFact_conflictId_fkey" FOREIGN KEY ("conflictId") REFERENCES public."KBConflict"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBConflictFact KBConflictFact_factId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConflictFact"
    ADD CONSTRAINT "KBConflictFact_factId_fkey" FOREIGN KEY ("factId") REFERENCES public."KBFact"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBConflict KBConflict_constraintId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConflict"
    ADD CONSTRAINT "KBConflict_constraintId_fkey" FOREIGN KEY ("constraintId") REFERENCES public."KBConstraint"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: KBConflict KBConflict_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConflict"
    ADD CONSTRAINT "KBConflict_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBConstraint KBConstraint_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBConstraint"
    ADD CONSTRAINT "KBConstraint_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBDecision KBDecision_basedOnProposalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBDecision"
    ADD CONSTRAINT "KBDecision_basedOnProposalId_fkey" FOREIGN KEY ("basedOnProposalId") REFERENCES public."KBProposal"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: KBDecision KBDecision_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBDecision"
    ADD CONSTRAINT "KBDecision_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBDecision KBDecision_revisedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBDecision"
    ADD CONSTRAINT "KBDecision_revisedById_fkey" FOREIGN KEY ("revisedById") REFERENCES public."KBDecision"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: KBFactParticipation KBFactParticipation_conceptId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactParticipation"
    ADD CONSTRAINT "KBFactParticipation_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBFactParticipation KBFactParticipation_factId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactParticipation"
    ADD CONSTRAINT "KBFactParticipation_factId_fkey" FOREIGN KEY ("factId") REFERENCES public."KBFact"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBFactProjection KBFactProjection_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactProjection"
    ADD CONSTRAINT "KBFactProjection_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBFactProjection KBFactProjection_factId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactProjection"
    ADD CONSTRAINT "KBFactProjection_factId_fkey" FOREIGN KEY ("factId") REFERENCES public."KBFact"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBFactProjection KBFactProjection_knowledgeSpaceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFactProjection"
    ADD CONSTRAINT "KBFactProjection_knowledgeSpaceId_fkey" FOREIGN KEY ("knowledgeSpaceId") REFERENCES public."KBKnowledgeSpace"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBFact KBFact_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBFact"
    ADD CONSTRAINT "KBFact_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBIdentityOperation KBIdentityOperation_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBIdentityOperation"
    ADD CONSTRAINT "KBIdentityOperation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBKnowledgeSpace KBKnowledgeSpace_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBKnowledgeSpace"
    ADD CONSTRAINT "KBKnowledgeSpace_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBLabel KBLabel_conceptId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBLabel"
    ADD CONSTRAINT "KBLabel_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBLabel KBLabel_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBLabel"
    ADD CONSTRAINT "KBLabel_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: KBProposal KBProposal_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."KBProposal"
    ADD CONSTRAINT "KBProposal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LearnStrategyStage LearnStrategyStage_learnStrategyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LearnStrategyStage"
    ADD CONSTRAINT "LearnStrategyStage_learnStrategyId_fkey" FOREIGN KEY ("learnStrategyId") REFERENCES public."LearnStrategy"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LearnStrategyStage LearnStrategyStage_learnStrategyTargetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LearnStrategyStage"
    ADD CONSTRAINT "LearnStrategyStage_learnStrategyTargetId_fkey" FOREIGN KEY ("learnStrategyTargetId") REFERENCES public."LearnStrategy"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: LearnStrategyStage LearnStrategyStage_technologyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LearnStrategyStage"
    ADD CONSTRAINT "LearnStrategyStage_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES public."Technology"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: LearnStrategy LearnStrategy_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LearnStrategy"
    ADD CONSTRAINT "LearnStrategy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MentorMentee MentorMentee_menteeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MentorMentee"
    ADD CONSTRAINT "MentorMentee_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MentorMentee MentorMentee_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MentorMentee"
    ADD CONSTRAINT "MentorMentee_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MindLog MindLog_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MindLog"
    ADD CONSTRAINT "MindLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Offer Offer_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Offer"
    ADD CONSTRAINT "Offer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Position Position_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Position"
    ADD CONSTRAINT "Position_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PostRevision PostRevision_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostRevision"
    ADD CONSTRAINT "PostRevision_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjectMember ProjectMember_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectMember"
    ADD CONSTRAINT "ProjectMember_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectMember ProjectMember_Project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectMember"
    ADD CONSTRAINT "ProjectMember_Project_fkey" FOREIGN KEY ("Project") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectMember ProjectMember_User_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectMember"
    ADD CONSTRAINT "ProjectMember_User_fkey" FOREIGN KEY ("User") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectTask ProjectTask_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectTask ProjectTask_Project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_Project_fkey" FOREIGN KEY ("Project") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectTask ProjectTask_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjectTask"
    ADD CONSTRAINT "ProjectTask_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Project Project_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Project Project_Image_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_Image_fkey" FOREIGN KEY ("Image") REFERENCES public."File"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Project Project_Resource_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_Resource_fkey" FOREIGN KEY ("Resource") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Project Project_Team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_Team_fkey" FOREIGN KEY ("Team") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ResetPassword ResetPassword_User_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResetPassword"
    ADD CONSTRAINT "ResetPassword_User_fkey" FOREIGN KEY ("User") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ResourceTag ResourceTag_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceTag"
    ADD CONSTRAINT "ResourceTag_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ResourceTag ResourceTag_Resource_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceTag"
    ADD CONSTRAINT "ResourceTag_Resource_fkey" FOREIGN KEY ("Resource") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ResourceTag ResourceTag_Tag_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResourceTag"
    ADD CONSTRAINT "ResourceTag_Tag_fkey" FOREIGN KEY ("Tag") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_Blog_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_Blog_fkey" FOREIGN KEY ("Blog") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_Parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_PrismaProject_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_PrismaProject_fkey" FOREIGN KEY ("PrismaProject") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_Service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_Service_fkey" FOREIGN KEY ("Service") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_Team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_Team_fkey" FOREIGN KEY ("Team") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Resource Resource_Topic_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_Topic_fkey" FOREIGN KEY ("Topic") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ServiceCategory ServiceCategory_Parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ServiceCategory"
    ADD CONSTRAINT "ServiceCategory_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES public."ServiceCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Service Service_Category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_Category_fkey" FOREIGN KEY ("Category") REFERENCES public."ServiceCategory"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Service Service_Parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SiteRoute SiteRoute_kBConceptId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteRoute"
    ADD CONSTRAINT "SiteRoute_kBConceptId_fkey" FOREIGN KEY ("kBConceptId") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SiteRoute SiteRoute_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteRoute"
    ADD CONSTRAINT "SiteRoute_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."SiteRoute"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SystemLog SystemLog_incidentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SystemLog"
    ADD CONSTRAINT "SystemLog_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES public."Incident"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SystemLog SystemLog_redirectRuleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SystemLog"
    ADD CONSTRAINT "SystemLog_redirectRuleId_fkey" FOREIGN KEY ("redirectRuleId") REFERENCES public."RedirectRule"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskMember TaskMember_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskMember"
    ADD CONSTRAINT "TaskMember_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskMember TaskMember_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskMember"
    ADD CONSTRAINT "TaskMember_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskMember TaskMember_User_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskMember"
    ADD CONSTRAINT "TaskMember_User_fkey" FOREIGN KEY ("User") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskReaction TaskReaction_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskReaction"
    ADD CONSTRAINT "TaskReaction_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TaskReaction TaskReaction_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskReaction"
    ADD CONSTRAINT "TaskReaction_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskTechnology TaskTechnology_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskTechnology"
    ADD CONSTRAINT "TaskTechnology_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TaskTechnology TaskTechnology_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskTechnology"
    ADD CONSTRAINT "TaskTechnology_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskTechnology TaskTechnology_Technology_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskTechnology"
    ADD CONSTRAINT "TaskTechnology_Technology_fkey" FOREIGN KEY ("Technology") REFERENCES public."Technology"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TaskWorkLog TaskWorkLog_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskWorkLog"
    ADD CONSTRAINT "TaskWorkLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaskWorkLog TaskWorkLog_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskWorkLog"
    ADD CONSTRAINT "TaskWorkLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_ChatRoom_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_ChatRoom_fkey" FOREIGN KEY ("ChatRoom") REFERENCES public."ChatRoom"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Task Task_assigneeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Task Task_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TeamMember TeamMember_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TeamMember TeamMember_Team_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_Team_fkey" FOREIGN KEY ("Team") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TeamMember TeamMember_User_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_User_fkey" FOREIGN KEY ("User") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Team Team_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Team Team_Parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Team"
    ADD CONSTRAINT "Team_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TechnologyLessonUser TechnologyLessonUser_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TechnologyLessonUser"
    ADD CONSTRAINT "TechnologyLessonUser_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TechnologyLessonUser TechnologyLessonUser_Lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TechnologyLessonUser"
    ADD CONSTRAINT "TechnologyLessonUser_Lesson_fkey" FOREIGN KEY ("Lesson") REFERENCES public."TechnologyLesson"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TechnologyLesson TechnologyLesson_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TechnologyLesson"
    ADD CONSTRAINT "TechnologyLesson_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TechnologyLesson TechnologyLesson_Technology_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TechnologyLesson"
    ADD CONSTRAINT "TechnologyLesson_Technology_fkey" FOREIGN KEY ("Technology") REFERENCES public."Technology"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Technology Technology_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Technology"
    ADD CONSTRAINT "Technology_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TelegramAccount TelegramAccount_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TelegramAccount"
    ADD CONSTRAINT "TelegramAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Timer Timer_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Timer"
    ADD CONSTRAINT "Timer_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Timer Timer_Task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Timer"
    ADD CONSTRAINT "Timer_Task_fkey" FOREIGN KEY ("Task") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Token Token_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_balanceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES public."Balance"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_ethTransactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_ethTransactionId_fkey" FOREIGN KEY ("ethTransactionId") REFERENCES public."EthTransaction"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Transaction"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserLearnStrategy UserLearnStrategy_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserLearnStrategy"
    ADD CONSTRAINT "UserLearnStrategy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserLearnStrategy UserLearnStrategy_learnStrategyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserLearnStrategy"
    ADD CONSTRAINT "UserLearnStrategy_learnStrategyId_fkey" FOREIGN KEY ("learnStrategyId") REFERENCES public."LearnStrategy"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserTechnology UserTechnology_CreatedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserTechnology"
    ADD CONSTRAINT "UserTechnology_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserTechnology UserTechnology_Technology_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserTechnology"
    ADD CONSTRAINT "UserTechnology_Technology_fkey" FOREIGN KEY ("Technology") REFERENCES public."Technology"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_referrerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vote Vote_Resource_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_Resource_fkey" FOREIGN KEY ("Resource") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _IdentityInput _IdentityInput_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_IdentityInput"
    ADD CONSTRAINT "_IdentityInput_A_fkey" FOREIGN KEY ("A") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IdentityInput _IdentityInput_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_IdentityInput"
    ADD CONSTRAINT "_IdentityInput_B_fkey" FOREIGN KEY ("B") REFERENCES public."KBIdentityOperation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IdentityOutput _IdentityOutput_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_IdentityOutput"
    ADD CONSTRAINT "_IdentityOutput_A_fkey" FOREIGN KEY ("A") REFERENCES public."KBConcept"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IdentityOutput _IdentityOutput_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_IdentityOutput"
    ADD CONSTRAINT "_IdentityOutput_B_fkey" FOREIGN KEY ("B") REFERENCES public."KBIdentityOperation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _PositionUsers _PositionUsers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_PositionUsers"
    ADD CONSTRAINT "_PositionUsers_A_fkey" FOREIGN KEY ("A") REFERENCES public."Position"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _PositionUsers _PositionUsers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_PositionUsers"
    ADD CONSTRAINT "_PositionUsers_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _PrismaProjectUsers _PrismaProjectUsers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_PrismaProjectUsers"
    ADD CONSTRAINT "_PrismaProjectUsers_A_fkey" FOREIGN KEY ("A") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _PrismaProjectUsers _PrismaProjectUsers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_PrismaProjectUsers"
    ADD CONSTRAINT "_PrismaProjectUsers_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectCustomers _ProjectCustomers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ProjectCustomers"
    ADD CONSTRAINT "_ProjectCustomers_A_fkey" FOREIGN KEY ("A") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectCustomers _ProjectCustomers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ProjectCustomers"
    ADD CONSTRAINT "_ProjectCustomers_B_fkey" FOREIGN KEY ("B") REFERENCES public."Team"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectMemberServices _ProjectMemberServices_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ProjectMemberServices"
    ADD CONSTRAINT "_ProjectMemberServices_A_fkey" FOREIGN KEY ("A") REFERENCES public."ProjectMember"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProjectMemberServices _ProjectMemberServices_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ProjectMemberServices"
    ADD CONSTRAINT "_ProjectMemberServices_B_fkey" FOREIGN KEY ("B") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
