using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ActApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class v6production : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Discriminator",
                table: "Users",
                newName: "UserType");

            migrationBuilder.AddColumn<string>(
                name: "Actor_Biography",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Actor_Birthdate",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Users",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Users",
                type: "double precision",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Actor_Biography",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Actor_Birthdate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "UserType",
                table: "Users",
                newName: "Discriminator");
        }
    }
}
