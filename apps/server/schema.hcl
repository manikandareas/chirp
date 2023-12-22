table "__old_push_user" {
  schema = schema.main
  column "id" {
    null = false
    type = text(36)
  }
  column "name" {
    null = false
    type = text
  }
  column "email" {
    null = false
    type = text
  }
  column "password" {
    null = false
    type = text
  }
  primary_key {
    columns = [column.id]
  }
  index "user_email_unique" {
    unique  = true
    columns = [column.email]
  }
}
table "images" {
  schema = schema.main
  column "id" {
    null           = false
    type           = integer
    auto_increment = true
  }
  column "url" {
    null = false
    type = text
  }
  column "post_id" {
    null = false
    type = text(36)
  }
  column "created_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  column "updated_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  primary_key {
    columns = [column.id]
  }
}
table "likes" {
  schema = schema.main
  column "user_id" {
    null = false
    type = text(36)
  }
  column "post_id" {
    null = false
    type = text(36)
  }
  column "created_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  column "updated_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  primary_key {
    columns = [column.user_id, column.post_id]
  }
}
table "post" {
  schema = schema.main
  column "id" {
    null = false
    type = text(36)
  }
  column "status" {
    null = false
    type = text
  }
  column "author_id" {
    null = false
    type = text(36)
  }
  column "created_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  column "updated_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  primary_key {
    columns = [column.id]
  }
}
table "user" {
  schema = schema.main
  column "id" {
    null = false
    type = text(36)
  }
  column "name" {
    null = false
    type = text
  }
  column "first_name" {
    null = false
    type = text
  }
  column "last_name" {
    null = false
    type = text
  }
  column "email" {
    null = false
    type = text
  }
  column "password" {
    null = false
    type = text
  }
  column "image" {
    null = true
    type = text
  }
  column "gender" {
    null = false
    type = text
  }
  column "address" {
    null = true
    type = text
  }
  column "created_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  column "updated_at" {
    null    = false
    type    = text
    default = sql("CURRENT_TIMESTAMP")
  }
  primary_key {
    columns = [column.id]
  }
}
schema "main" {
}
