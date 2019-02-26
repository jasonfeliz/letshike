require 'test_helper'

class FavoriteTrailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @favorite_trail = favorite_trails(:one)
  end

  test "should get index" do
    get favorite_trails_url, as: :json
    assert_response :success
  end

  test "should create favorite_trail" do
    assert_difference('FavoriteTrail.count') do
      post favorite_trails_url, params: { favorite_trail: { trail_id: @favorite_trail.trail_id, user: @favorite_trail.user } }, as: :json
    end

    assert_response 201
  end

  test "should show favorite_trail" do
    get favorite_trail_url(@favorite_trail), as: :json
    assert_response :success
  end

  test "should update favorite_trail" do
    patch favorite_trail_url(@favorite_trail), params: { favorite_trail: { trail_id: @favorite_trail.trail_id, user: @favorite_trail.user } }, as: :json
    assert_response 200
  end

  test "should destroy favorite_trail" do
    assert_difference('FavoriteTrail.count', -1) do
      delete favorite_trail_url(@favorite_trail), as: :json
    end

    assert_response 204
  end
end
