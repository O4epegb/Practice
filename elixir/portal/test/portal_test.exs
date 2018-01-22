defmodule PortalTest do
  use ExUnit.Case
  doctest Portal

  test "start_link is working" do
    {status, _} = Portal.Door.start_link(:blue)
    assert(status == :ok)
  end
end
