class FavoriteTrailSerializer < ActiveModel::Serializer
  attributes :id, :user, :trail_id
end
