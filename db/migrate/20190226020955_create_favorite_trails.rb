class CreateFavoriteTrails < ActiveRecord::Migration[5.2]
  def change
    create_table :favorite_trails do |t|
      t.reference :user
      t.int :trail_id

      t.timestamps
    end
  end
end
