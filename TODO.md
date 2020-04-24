# Immediate
+ [ ] finish sql merge
  + [ ] restore pagination (e.g. x-filter-count)
  + [ ] there needs to be an option in model.createMany to not include primary key

# Bugs
+ [ ] Invalid date in threadlink
+ [ ] restore requiresAuth to api calls (or just use an /api vs /api/public schema)

# SQL
+ [ ] use connection pooling
+ [ ] genericize CRUD controller code, perhaps
+ [ ] genericize CRUD model operations, perhaps
+ [ ] argHelper
  + [ ] rename argHelper and its exports to something more meaningful
  + [ ] turn argHelper into a full query builder
  + [ ] fix IN() use case (it doesn't work)
  + [ ] implement projection
  + [ ] full text?
+ [ ] enable metadata!!!
+ [ ] remove unnecessary dependencies
+ [ ] consider renaming "create" to "insert" (createMany -> insertMany)

# Style
+ [ ] non-shitty css
+ [ ] add post, add forum, etc
+ [ ] parse bbCode, wikitext, etc
+ [ ] implement displayOrder (by replacing fid in pidTree)
+ [x] implement childForums list in forumDetail

# Code Quality
+ [x] switch to URLSearchParams from query-string
+ [ ] cache getUser
+ [ ] Totally separate all dumb components into their own files
+ [ ] tests for dumb components! lol
+ [ ] prop-types for dumb components. not so lol
+ [ ] move sections of express startup script into helpers? (e.g. https) or at least functions

# Consider
+ [ ] Moving all metadata to its own controller? is any of it securely in the context of either forum, thread, or post?
+ [ ] Exchanging smart components for something else?

# Metadata
+ [x] use aggregation pipeline to get metadata for:
  + [x] Forum List: # of threads per forum, most recent one
  + [x] Thread List: # of posts per thread, most recent one
  + [x] find a better way to organize controllers to include metadata

# Some Day
+ [ ] replace crud-routes with graphQL and Relay?
