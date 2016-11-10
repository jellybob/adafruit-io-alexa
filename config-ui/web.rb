require 'sinatra'

get '/' do
  erb :index, locals: { params: params }
end

post '/' do
  final_uri = "#{params['redirect_uri']}#state=#{params['state']}&token_type=Bearer&access_token=#{params['adafruit_key']}" # rubocop:disable Metrics/LineLength
  redirect to(final_uri)
end
