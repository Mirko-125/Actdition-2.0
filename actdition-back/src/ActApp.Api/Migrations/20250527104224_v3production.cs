using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class v3production : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Productions_Code",
                table: "Productions");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Productions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Productions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Productions_Code",
                table: "Productions",
                column: "Code",
                unique: true);
        }
    }
}
