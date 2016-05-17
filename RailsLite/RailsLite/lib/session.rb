require 'json'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    if req.cookies["_rails_lite_app"].nil?
      @data = {}
    else
      @data = JSON.parse(req.cookies["_rails_lite_app"])
    end
  end

  def [](key)
    @data[key]
  end

  def []=(key, val)
    @data[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    cookie = {}
    cookie[:path] = "/"
    cookie[:value] = @data.to_json
    res.set_cookie("_rails_lite_app", cookie)
  end
end
