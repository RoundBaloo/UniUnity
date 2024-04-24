from marshmallow import Schema, fields, validate


class ProjectSchema(Schema):
    id = fields.Integer(dump_only=True)
    user_id = fields.Integer(dump_only=True)
    name = fields.String(validate=[
        validate.Length(max=150)])
    type = fields.String(validate=[
        validate.Length(max=100)])
    description = fields.String(validate=[
        validate.Length(max=400)])
    project_link = fields.String(validate=[
        validate.Length(max=500)])
    message = fields.String(dump_only=True)



