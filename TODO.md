# Next
+ [ ] non-shitty css
+ [ ] add post, add forum, etc
+ [x] fix crudroutes to support id searches using fields other than _id
+ [ ] parse bbCode, wikitext, etc
+ [ ] implement displayOrder (by replacing fid in pidTree)
+ [ ] implement childForums list in forumDetail
+ [x] switch to URLSearchParams from query-string

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

# General
+ [x] Explore MVC architecture
+ [x] Implement post list, post detail
+ [ ] Totally separate all dumb components into their own files
+ [ ] tests for dumb components! lol
+ [ ] prop-types for dumb components. not so lol
+ [ ] move sections of express startup script into helpers? (e.g. https) or at least functions