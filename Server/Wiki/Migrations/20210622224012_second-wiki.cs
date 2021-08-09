using Microsoft.EntityFrameworkCore.Migrations;

namespace Wiki.Migrations
{
    public partial class secondwiki : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Document",
                table: "Workspaces",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Workspaces",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Document",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Workspaces");
        }
    }
}
