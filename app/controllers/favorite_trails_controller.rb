class FavoriteTrailsController < ApiController
  before_action :set_favorite_trail, only: [:show, :update, :destroy]

  # GET /favorite_trails
  # GET /favorite_trails.json
  def index
    @favorite_trails = FavoriteTrail.where(user_id: 1)
    @new_arr = @favorite_trails.map {|trail| trail.trail_id }
    render json: @new_arr, status: :ok

  end

  # POST /favorite_trails
  def create
    @favorite_trail = FavoriteTrail.new(favorite_trail_params)

    if @favorite_trail.save
      render :show, status: :created
    else
      render json: @favorite_trail.errors, status: :unprocessable_entity
    end
  end

  # DELETE /favorite_trails/1
  def destroy
    @favorite_trail.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_favorite_trail
      @favorite_trail = FavoriteTrail.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def favorite_trail_params
      params.require(:favorite_trail).permit(:user_id, :trail_id)
    end
end
