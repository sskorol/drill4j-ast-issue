# Drill4j AST Issue

### Install

```shell
git clone https://github.com/sskorol/drill4j-ast-issue.git && cd drill4j-ast-issue
npm install
npm run ast
```

### Experiments and results interpretation

During initial run, you'll fail with the following message, which doesn't seem like a valid line number.
```shell
Processing sources
         src/main.ts
         src/test.ts
         src/app/app-routing.module.ts
         src/app/app.component.spec.ts
         src/app/app.component.ts
         failed to parse src/app/app.component.ts due to
 {"index":342,"lineNumber":14,"column":9,"message":"'}' expected."} 
```

When you comment line 12:
```typescript
brokenField = <any>{};
```

This error will disappear, but you'll see the following:
```shell
Processing sources
         src/main.ts
         src/test.ts
         src/app/app-routing.module.ts
         src/app/app.component.spec.ts
         src/app/app.component.ts
         failed to parse src/app/app.component.ts due to
 {"index":567,"lineNumber":22,"column":18,"message":"JSX element 'HTMLStyleElement' has no corresponding closing tag."}
```

Which is also incorrect, as it's not a JSX tag, but rather a typecasting syntax.

If you remove `<HTMLStyleElement>` from line 22:
```typescript
stylesEl = <HTMLStyleElement>document.createElement('style');
```

You'll get a new error:
```shell
Processing sources
         src/main.ts
         src/test.ts
         src/app/app-routing.module.ts
         src/app/app.component.spec.ts
         src/app/app.component.ts
         failed to parse src/app/app.component.ts due to
 {"index":597,"lineNumber":22,"column":48,"message":"'}' expected."} 
```

That's also confusing, as it refers to the same line. The root cause is at line 20:
```typescript
let stylesEl = <HTMLStyleElement>window.document.getElementById(AppComponent.dummyStylesElementId);
```

If you replace it with the following and re-run, you'll see a "green" build:
```typescript
let stylesEl = window.document.getElementById(AppComponent.dummyStylesElementId) as HTMLStyleElement;
```

So I see 2 issues here:

- Incorrect work with a diamond operator `<>` which is used for typecasting.
- Treating the same operator as a JSX tag.
