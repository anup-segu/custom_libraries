require 'json'
require 'byebug'

class Flash

  def initialize(req)
    @new_data = {}
    @now_data = {}

    if req.cookies["_rails_lite_app_flash"]
      @old_data = JSON.parse(req.cookies["_rails_lite_app_flash"])
      @now_data.merge!(@old_data)
    end
  end

  def now
    @now_data
  end

  def now=(val)
    @now_data = val
  end

  def [](key)
    @new_data[key]
  end

  def []=(key, val)
    @new_data[key] = val
  end

  def store_session(res)
    cookie = {}
    cookie[:path] = "/"
    cookie[:value] = @new_data.to_json
    res.set_cookie("_rails_lite_app_flash", cookie)
  end

  def now_store_session(res)
    cookie = {}
    cookie[:path] = "/"
    cookie[:value] = @now_data.to_json
    res.set_cookie("_rails_lite_app_flash", cookie)
  end
end
