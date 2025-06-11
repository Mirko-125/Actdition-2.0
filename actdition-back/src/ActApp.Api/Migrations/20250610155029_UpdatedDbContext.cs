using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_CastingDirector_ProductionId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CastingDirector_ProductionId",
                table: "Users",
                column: "CastingDirector_ProductionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_CastingDirector_ProductionId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CastingDirector_ProductionId",
                table: "Users",
                column: "CastingDirector_ProductionId",
                unique: true);
        }
    }
}
