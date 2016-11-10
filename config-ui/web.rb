require 'aws-sdk-core'
require 'sinatra'

get '/' do
  erb :index, locals: { alexa_id: params['alexa_id'] }
end

post '/' do
  if params['adafruit_key'].length > 100
    status 422
    body 'No one has an Adafruit key that long'
  else
    s3 = Aws::S3::Client.new
    s3.put_object(
      bucket: ENV['S3_BUCKET'],
      key: params['alexa_id'],
      acl: 'private',
      body: params['adafruit_key']
    )
    "Done. Key: #{params['adafruit_key']}, Alexa ID: #{params['alexa_id']}"
  end
end
