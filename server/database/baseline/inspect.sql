WITH objects AS (
  SELECT 'column' AS kind, c.relname || '.' || a.attname AS name,
    jsonb_build_object('type', format_type(a.atttypid, a.atttypmod), 'required', a.attnotnull,
      'default', pg_get_expr(d.adbin, d.adrelid), 'identity', a.attidentity,
      'generated', a.attgenerated, 'collation', co.collname) AS definition
  FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
  JOIN pg_attribute a ON a.attrelid=c.oid AND a.attnum>0 AND NOT a.attisdropped
  LEFT JOIN pg_attrdef d ON d.adrelid=c.oid AND d.adnum=a.attnum
  LEFT JOIN pg_collation co ON co.oid=a.attcollation
  WHERE n.nspname='public' AND c.relkind IN ('r','p','v','m')
    AND c.relname NOT IN ('knex_migrations','knex_migrations_lock')
  UNION ALL
  SELECT 'table', c.relname, jsonb_build_object('kind', c.relkind, 'rls', c.relrowsecurity, 'forceRls', c.relforcerowsecurity)
  FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='public' AND c.relkind IN ('r','p') AND c.relname NOT IN ('knex_migrations','knex_migrations_lock')
  UNION ALL
  SELECT 'constraint', c.relname || '.' || co.conname, to_jsonb(pg_get_constraintdef(co.oid))
  FROM pg_constraint co JOIN pg_class c ON c.oid=co.conrelid JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='public' AND c.relname NOT IN ('knex_migrations','knex_migrations_lock')
  UNION ALL
  SELECT 'index', indexname, to_jsonb(indexdef) FROM pg_indexes
  WHERE schemaname='public' AND tablename NOT IN ('knex_migrations','knex_migrations_lock')
  UNION ALL
  SELECT 'enum', t.typname, jsonb_agg(e.enumlabel ORDER BY e.enumsortorder)
  FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace JOIN pg_enum e ON e.enumtypid=t.oid
  WHERE n.nspname='public' GROUP BY t.typname
  UNION ALL
  SELECT 'view', c.relname, to_jsonb(pg_get_viewdef(c.oid))
  FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND c.relkind IN ('v','m')
  UNION ALL
  SELECT 'function', p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')', to_jsonb(pg_get_functiondef(p.oid))
  FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.prokind IN ('f','p')
  UNION ALL
  SELECT 'trigger', c.relname || '.' || t.tgname, to_jsonb(pg_get_triggerdef(t.oid))
  FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='public' AND NOT t.tgisinternal
  UNION ALL
  SELECT 'sequence', sequencename, to_jsonb(s) - 'last_value' - 'sequenceowner'
  FROM pg_sequences s WHERE schemaname='public' AND sequencename NOT IN ('knex_migrations_id_seq','knex_migrations_lock_index_seq')
  UNION ALL
  SELECT 'policy', tablename || '.' || policyname, to_jsonb(p) FROM pg_policies p WHERE schemaname='public'
)
SELECT kind, name, definition FROM objects ORDER BY kind COLLATE "C", name COLLATE "C";
