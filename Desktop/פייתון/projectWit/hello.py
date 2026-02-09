import click

@click.command()
@click.argument('name')
def hello():
    """הדפסת ברכת שלום"""
    click.echo(f"שלום!")


    hello()


