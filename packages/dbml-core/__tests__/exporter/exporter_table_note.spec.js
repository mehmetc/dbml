import exporter from '../../src/export';

const data = `
table names {
    id serial [pk]
    first_name text [note: "this is a column note"]
    last_name text
  
    note: "this is a table note"
}`

describe('Table notes', () => {
    test('Postgres export table notes', () => {
        const result = exporter.export(data, "postgres");
        expect(result).toEqual(expect.stringContaining('COMMENT ON TABLE'));
    })

    test('MySQL export table notes', () => {
        const result = exporter.export(data, "mysql");
        expect(result).toMatch(/COMMENT 'this is a table note'\;\n$/);
    })
});